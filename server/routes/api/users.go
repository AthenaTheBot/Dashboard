package api

import (
	"net/http"

	"athena.bot/helpers"
	"athena.bot/models"
	"athena.bot/server/middlewares"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
	"golang.org/x/sync/syncmap"
)

func UsersRoute(r *gin.RouterGroup, bot *discordgo.Session, users syncmap.Map, userGuilds syncmap.Map) {
	r.GET("/@me", middlewares.Authorization(), func(ctx *gin.Context) {
		token, _ := ctx.Cookie("session")

		user, err := helpers.GetUser(users, token)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}

		ctx.JSON(http.StatusOK, user)
	})

	r.GET("/@me/guilds", middlewares.Authorization(), func(ctx *gin.Context) {
		token, _ := ctx.Cookie("session")
		manageable := ctx.Query("manageable")

		guilds, err := helpers.GetUserGuilds(userGuilds, bot, token)

		if err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}

		if manageable == "true" || manageable == "1" {
			manageables := []models.GuildPreview{}
			for _, guild := range guilds {
				if guild.IsManageable() {
					manageables = append(manageables, guild)
				}
			}

			ctx.JSON(http.StatusOK, manageables)
		} else {
			ctx.JSON(http.StatusOK, guilds)
		}
	})
}