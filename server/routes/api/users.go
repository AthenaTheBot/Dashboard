package api

import (
	"encoding/json"
	"net/http"

	"athena.bot/helpers"
	"athena.bot/models"
	"athena.bot/server/middlewares"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
	"golang.org/x/sync/syncmap"
)

func UsersRoute(r *gin.RouterGroup, bot *discordgo.Session, users syncmap.Map, userGuilds syncmap.Map, userManageableGuilds syncmap.Map) {
	r.GET("/@me", middlewares.Authorization(middlewares.COOKIE), func(ctx *gin.Context) {
		token, _ := ctx.Cookie("session")

		user, err := helpers.GetUser(users, token)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}

		ctx.AbortWithStatusJSON(http.StatusOK, user)
	})

	r.GET("/@me/guilds", middlewares.Authorization(middlewares.COOKIE), func(ctx *gin.Context) {
		token, _ := ctx.Cookie("session")
		manageable := ctx.Query("manageable")

		guilds, err := helpers.GetUserGuilds(userGuilds, bot, token)

		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"message": "Server Error",
			})
			return
		}

		if manageable == "true" || manageable == "1" {
			manageables := []models.GuildPreview{}

			for _, guild := range guilds {
				if  guild.IsManageable() {
					manageables = append(manageables, guild)
				}
			}

			bs, err := json.Marshal(manageables)

			if err != nil {
				ctx.Abort()
				return
			}

			ctx.Writer.Write(bs)
			ctx.Abort()
		} else {
			bs, err := json.Marshal(guilds)

			if err != nil {
				ctx.Abort()
				return
			}

			ctx.Writer.Write(bs)
			ctx.Abort()
		}
	})
}