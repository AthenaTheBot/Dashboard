package routes

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"

	"athena.bot/helpers"
	"athena.bot/models"
	"athena.bot/server/routes/api"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/sync/syncmap"
)

func ApiRoute(r *gin.RouterGroup, config models.Config, bot *discordgo.Session, db *mongo.Client, users syncmap.Map, userGuilds syncmap.Map, userManageableGuilds syncmap.Map) {
	api.UsersRoute(r.Group("users"), bot, users, userGuilds, userManageableGuilds)
	api.GuildsRoute(r.Group("guilds"), config, bot, db, users,  userGuilds)

	r.GET("/commands", func (ctx *gin.Context)  {
		p, _ := os.Getwd()
		path := filepath.Join(p, "/data/commands.json")
		file, err := os.ReadFile(path)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})		

			return	
		}

		commands := []models.Command{}
		parseErr := json.Unmarshal(file, &commands)

		if parseErr != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})		

			return	
		}

		commandCategories := helpers.ParseCommands(commands)

		data, parseErr := json.Marshal(commandCategories)

		if parseErr != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})		

			return	
		}

		ctx.Data(200, "application/json", data)
	})

	r.GET("/available-languages", func (ctx *gin.Context)  {
		ctx.AbortWithStatusJSON(http.StatusOK, []models.Language{
			{ Id: "en_US", Label: "English" },
			{ Id: "tr_TR", Label: "Türkçe" },
		})
	})
}