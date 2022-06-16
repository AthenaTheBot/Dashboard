package helpers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"athena.bot/models"
	"athena.bot/permissions"
	"athena.bot/utils"
	"github.com/bwmarrin/discordgo"
)

func ExchangeToken(code string, botCfg models.BotConfig) (models.AccessTokenResponse, error) {
	reqBody := fmt.Sprintf("grant_type=authorization_code&client_id=%s&client_secret=%s&redirect_uri=%s&code=%s", botCfg.ClientId, botCfg.ClientSecret, botCfg.RedirectUri, code)

	resp, err := http.Post("https://discord.com/api/oauth2/token", "application/x-www-form-urlencoded", strings.NewReader(reqBody))

	if err != nil {
		utils.Log(models.ERROR, "An error occured while getting access token of a user.")
		fmt.Println(err)
		return models.AccessTokenResponse{}, err
	}

	var accessTokenResp models.AccessTokenResponse

	parseErr := json.NewDecoder(resp.Body).Decode(&accessTokenResp)

	if parseErr != nil {
		utils.Log(models.ERROR, "An error occured while parsing access token response.")
		fmt.Println(parseErr)
		return models.AccessTokenResponse{}, parseErr
	}

	return accessTokenResp, nil
}

func GetUser(token string) (models.User, error) {
	client := http.Client{}
	req, _ := http.NewRequest(http.MethodGet, "https://discord.com/api/users/@me", nil)

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	resp, err := client.Do(req)

	if err != nil {
		utils.Log(models.ERROR, "An error occured while making request to Discord.")
		fmt.Println(err)
		return models.User{}, err
	}

	var user models.User

	parseErr := json.NewDecoder(resp.Body).Decode(&user)

	if parseErr != nil {
		utils.Log(models.ERROR, "An error occured while parsing request body.")
		fmt.Println(parseErr)
		return models.User{}, parseErr
	}

	user.Avatar = fmt.Sprintf("https://cdn.discordapp.com/avatars/%s/%s", user.Id, user.Avatar)
	user.Color = fmt.Sprintf("#%x", user.AccentColor)

	return user, nil
}

func GetUserGuilds(session *discordgo.Session, token string) ([]models.Guild, error) {
	client := http.Client{}
	req, _ := http.NewRequest(http.MethodGet, "https://discord.com/api/users/@me/guilds", nil)

	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", token))

	resp, err := client.Do(req)

	if err != nil {
		utils.Log(models.ERROR, "An error occured while making request to Discord.")
		fmt.Println(err)
		return []models.Guild{}, err
	}

	var guildsRaw []models.GuildRaw
	var guilds []models.Guild

	parseErr := json.NewDecoder(resp.Body).Decode(&guildsRaw)

	if parseErr != nil {
		utils.Log(models.ERROR, "An error occured while parsing request body.")
		fmt.Println(parseErr)
		return []models.Guild{}, parseErr
	}

	for _, guild := range guildsRaw {
		convertedGuild := models.Guild{
			Id: guild.Id,
			Name: guild.Name,
			Icon: fmt.Sprintf("https://cdn.discordapp.com/icons/%s/%s", guild.Id, guild.Icon),
			Permissions: permissions.ParseBitField(guild.PermissionsBit),
			Available: CheckGuildAvailability(session, guild.Id),
		}

		guilds = append(guilds, convertedGuild)
	}

	return guilds, nil
}

func CheckGuildAvailability(session *discordgo.Session, id string) bool {
	available := false

	for _, guild := range session.State.Guilds {
		if guild.ID == id {
			available = true
		}
	}

	return available
}