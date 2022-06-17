package routes

import (
	"net/http"
	"os"
	"path/filepath"

	"athena.bot/models"
	"athena.bot/server/routes/api"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func ApiRoute(r *gin.RouterGroup, bot *discordgo.Session, db *mongo.Client, users map[string]models.User, userGuilds map[string][]models.GuildPreview) {
	api.UsersRoute(r.Group("users"), bot, users, userGuilds)
	api.GuildsRoute(r.Group("guilds"),bot, db, users, userGuilds)

	r.GET("/commands", func (ctx *gin.Context)  {
		p, _ := os.Getwd()
		path := filepath.Join(p, "/data/commands.json")
		file, err := os.ReadFile(path)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})		

			return	
		}


		ctx.Data(200, "application/json", file)
	})

	r.GET("/available-languages", func (ctx *gin.Context)  {
		ctx.JSON(http.StatusOK, []models.Language{
			{ Id: "en_US", Label: "English" },
			{ Id: "tr_TR", Label: "Türkçe" },
		})
	})
}