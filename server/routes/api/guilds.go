package api

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"athena.bot/helpers"
	"athena.bot/models"
	"athena.bot/server/middlewares"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/sync/syncmap"
)

func GuildsRoute(r *gin.RouterGroup, config models.Config, bot *discordgo.Session, db *mongo.Client, users syncmap.Map, userGuilds syncmap.Map) {
	r.GET("/:id", middlewares.Authorization(middlewares.COOKIE), func (ctx *gin.Context)  {
		session, _ := ctx.Cookie("session")
		id := ctx.Param("id")

		guild, err := helpers.GetGuild(bot, db, userGuilds, id, session)

		if err != nil {
			if err.Error() == "Unauthorized" {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"message": "Unauthorized",
				})
				return

			} else if err.Error() == "Guild not found" {

				ctx.AbortWithStatusJSON(http.StatusNotFound, gin.H{
					"message": "Guild not found",
				})
				return
			} 

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}

		ctx.AbortWithStatusJSON(http.StatusOK, guild)
	})

	r.PATCH("/:id/:module", middlewares.Authorization(middlewares.COOKIE), func(ctx *gin.Context) {
		session, _ := ctx.Cookie("session")
		id := ctx.Param("id")
		module := ctx.Param("module")

		guilds, err := helpers.GetUserGuilds(userGuilds, bot, session)

		if err != nil {
			if err.Error() == "Unauthorized" {
				ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
					"message": "Unauthorized",
				})
				return

			} else if err.Error() == "Guild not found" {

				ctx.AbortWithStatusJSON(http.StatusNotFound, gin.H{
					"message": "Guild not found",
				})
				return
			} 

			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})

			return
		}

		canUpdateModule := false
		for _, guild := range guilds {
			if guild.Id == id && guild.IsManageable() {
				canUpdateModule = true
			}
		}

		if !canUpdateModule {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})

			return
		}

		var moduleSchema any
		switch(module) {
			case "settings":
				moduleSchema = models.SettingsModule{}
				break
			case "moderation":
				moduleSchema = models.ModerationModule{}
				break

			case "welcomer":
				moduleSchema = models.WelcomerModule{}
				break

			default:
				ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
					"message": "Bad Request",
				})
				break
		}

		if !ctx.IsAborted() {
			parseErr := json.NewDecoder(ctx.Request.Body).Decode(&moduleSchema)

			if parseErr != nil {
				ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"message": "Server Error",
				})

				return
			}

			_, dbErr := db.Database("AthenaV3").Collection("guilds").UpdateOne(context.TODO(), bson.D{primitive.E{Key: "_id", Value: id}}, bson.D{primitive.E{Key: "$set", Value: bson.D{primitive.E{ Key: fmt.Sprintf("modules.%s", module), Value: moduleSchema }} }})

			if dbErr != nil {
				ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
					"message": "Server Error",
				})
				return
			}

			ctx.AbortWithStatusJSON(http.StatusOK, gin.H{
				"message": "Successfull",
			})
		}
	})
}