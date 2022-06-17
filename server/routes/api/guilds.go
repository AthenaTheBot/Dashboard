package api

import (
	"net/http"

	"athena.bot/helpers"
	"athena.bot/models"
	"athena.bot/server/middlewares"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func GuildsRoute(r *gin.RouterGroup, bot *discordgo.Session, db *mongo.Client, users map[string]models.User, userGuilds map[string][]models.GuildPreview) {
	r.GET("/:id", middlewares.Authentication(), func (ctx *gin.Context)  {
		session, _ := ctx.Cookie("session")
		id := ctx.Param("id")

		guild, err := helpers.GetGuild(bot, db, userGuilds, id, session)

		if err != nil {
			if err.Error() == "Unauthorized" {
				ctx.JSON(http.StatusUnauthorized, gin.H{
					"message": "Unauthorized",
				})
				return

			} else if err.Error() == "Guild not found" {

				ctx.JSON(http.StatusNotFound, gin.H{
					"message": "Guild not found",
				})
				return
			} 

			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}

		ctx.JSON(http.StatusOK, guild)
	})
}