package helpers

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"athena.bot/models"
	"athena.bot/permissions"
	"athena.bot/utils"
	"github.com/bwmarrin/discordgo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func ExchangeToken(code string, botCfg models.BotConfig) (models.AccessTokenResponse, error) {
	reqBody := fmt.Sprintf("grant_type=authorization_code&client_id=%s&client_secret=%s&redirect_uri=%s&code=%s", botCfg.ClientId, botCfg.ClientSecret, botCfg.RedirectUri, code)

	resp, err := http.Post("https://discord.com/api/oauth2/token", "application/x-www-form-urlencoded", strings.NewReader(reqBody))

	if err != nil {
		utils.Log(models.ERROR, "An error occured while getting access token of a user.")
		return models.AccessTokenResponse{}, err
	}

	var accessTokenResp models.AccessTokenResponse

	parseErr := json.NewDecoder(resp.Body).Decode(&accessTokenResp)

	if parseErr != nil {
		utils.Log(models.ERROR, "An error occured while parsing access token response.")
		return models.AccessTokenResponse{}, parseErr
	}

	return accessTokenResp, nil
}

func GetUser(users map[string]models.User, session string) (models.User, error) {
	if _, ok := users[session]; ok {
		fmt.Println("Got request, returned from cache! (getuser)")
		return users[session], nil
	} else {
		fmt.Println("Got request, making request to Discord! (getuser)")
		client := http.Client{}
		req, _ := http.NewRequest(http.MethodGet, "https://discord.com/api/users/@me", nil)

		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", session))

		resp, err := client.Do(req)

		if err != nil {
			utils.Log(models.ERROR, "An error occured while making request to Discord.")
			return models.User{}, err
		}

		var user models.User

		parseErr := json.NewDecoder(resp.Body).Decode(&user)

		if parseErr != nil {
			utils.Log(models.ERROR, "An error occured while parsing request body.")
			return models.User{}, parseErr
		}

		user.Avatar = fmt.Sprintf("https://cdn.discordapp.com/avatars/%s/%s", user.Id, user.Avatar)
		user.Color = fmt.Sprintf("#%x", user.AccentColor)

		users[session] = user

		go func() {
			time.Sleep(time.Second * 60)
			delete(users, session)
		}()

		return user, nil
	}
}

func GetUserGuilds(userGuilds map[string][]models.GuildPreview, bot *discordgo.Session, session string) ([]models.GuildPreview, error) {
	if _, ok := userGuilds[session]; ok {
		fmt.Println("Got request, returned from cache! (getuserguilds)")
		return userGuilds[session], nil
	} else {
		fmt.Println("Got request, making request to Discord! (getuserguilds)")
		client := http.Client{}
		req, _ := http.NewRequest(http.MethodGet, "https://discord.com/api/users/@me/guilds", nil)

		req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", session))

		resp, err := client.Do(req)

		if err != nil {
			utils.Log(models.ERROR, "An error occured while making request to Discord.")
			return []models.GuildPreview{}, err
		}

		var guildsRaw []models.GuildRawPreview
		var guilds []models.GuildPreview

		parseErr := json.NewDecoder(resp.Body).Decode(&guildsRaw)

		if parseErr != nil {
			utils.Log(models.ERROR, "An error occured while parsing request body.")
			return []models.GuildPreview{}, parseErr
		}

		for _, guild := range guildsRaw {
			convertedGuild := models.GuildPreview{
				Id: guild.Id,
				Name: guild.Name,
				Icon: fmt.Sprintf("https://cdn.discordapp.com/icons/%s/%s", guild.Id, guild.Icon),
				Permissions: permissions.ParseBitField(guild.PermissionsBit),
				Available: CheckGuildAvailability(bot, guild.Id),
			}

			guilds = append(guilds, convertedGuild)
		}

		userGuilds[session] = guilds

		go func() {
			time.Sleep(time.Second * 60)
			delete(userGuilds, session)
		}()

		return guilds, nil
	}
}

func GetGuild(bot *discordgo.Session, db *mongo.Client, userGuilds map[string][]models.GuildPreview, id string, token string) (models.Guild, error) {
	guildPreviews, guildPreviewsErr := GetUserGuilds(userGuilds, bot, token)

	if guildPreviewsErr != nil {
		return models.Guild{}, guildPreviewsErr
	}

	authorized := false
	guildPreview := models.GuildPreview{}
	for _, gp := range guildPreviews {
		if gp.Id == id {
			authorized = true
			guildPreview = gp
		}		
	}

	if !authorized {
		return models.Guild{}, errors.New("Unauthorized")
	}

	guild := models.Guild{}
	dbErr := db.Database("AthenaV3").Collection("guilds").FindOne(context.TODO(), bson.D{primitive.E{Key: "_id", Value: id}}).Decode(&guild)

	if dbErr != nil {
		if dbErr == mongo.ErrNoDocuments {
			return models.Guild{}, errors.New("Guild not found")
		}

		return models.Guild{}, dbErr
	}

	guild.GuildPreview = guildPreview

	extraGuildData, _ := bot.Guild(id)

	if extraGuildData != nil {
		textChannelCount := 0
		voiceChannelCount := 0

		for _, c := range extraGuildData.Channels {
			if c.Type == discordgo.ChannelTypeGuildText {
				textChannelCount++
			} else if c.Type == discordgo.ChannelTypeGuildVoice {
				voiceChannelCount++
			}
		} 

		guild.Channels = models.Channels{
			Text: textChannelCount,
			Voice: voiceChannelCount,
		}
	}

	return guild, nil
}

func CheckGuildAvailability(bot *discordgo.Session, id string) bool {
	available := false

	for _, guild := range bot.State.Guilds {
		if guild.ID == id {
			available = true
			break
		}
	}

	return available
}

func HasCategory(commadCategories []models.CommandCategory, category string) bool {
	hasCategory := false
	
	for _, commandCategory := range commadCategories {
		if commandCategory.Category == category {
			hasCategory = true
			break
		}
	}

	return hasCategory
}

func GetCategoryIndex(commadCategories []models.CommandCategory, category string) (int) {
	categoryIndex := -1

	for i, cg := range commadCategories {
		if cg.Category == category {
			categoryIndex = i
		}
	}

	return categoryIndex
}

func ParseCommands(commands []models.Command) ([]models.CommandCategory) {
	commandCategories := []models.CommandCategory{}

	for _, command := range commands {
		if HasCategory(commandCategories, command.Category) {
			categoryIndex := GetCategoryIndex(commandCategories, command.Category)
			commandCategories[categoryIndex].Commands = append(commandCategories[categoryIndex].Commands, command)
		} else {
			commandCategory := models.CommandCategory{
				Category: command.Category,
				Commands: []models.Command{
					command,
				},
			}

			commandCategories = append(commandCategories, commandCategory)
		}
	}

	return commandCategories
}