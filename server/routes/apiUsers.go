package routes

import (
	"fmt"
	"time"

	"athena.bot/helpers"
	"athena.bot/models"
	"athena.bot/server/middlewares"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-gonic/gin"
)

func UsersRoute(r *gin.RouterGroup, session *discordgo.Session, users map[string]models.User, userGuilds map[string][]models.Guild) {
	r.GET("/@me", middlewares.Authentication(), func(ctx *gin.Context) {
		token, _ := ctx.Cookie("session")

		if _, ok := users[token]; ok {
			ctx.JSON(200, users[token])
		} else {
			user, err := helpers.GetUser(token)

			if err != nil {
				ctx.JSON(500, gin.H{
					"message": "Server Error",
				})

				fmt.Println(err)

				return
			}

			ctx.JSON(200, user)

			users[token] = user

			go func() {
				time.Sleep(time.Minute * 2)
				delete(users, token)
			}()
		}
	})

	r.GET("/@me/guilds", middlewares.Authentication(), func(ctx *gin.Context) {
		token, _ := ctx.Cookie("session")
		manageable := ctx.Query("manageable")

		if _, ok := userGuilds[token]; ok {
			if manageable == "true" || manageable == "1" {
				guilds := userGuilds[token]
				g := []models.Guild{}

				for _, guild := range guilds {
					if guild.IsManageable() {
						g = append(g, guild)
					}
				}

				ctx.JSON(200, g)
			} else {
				ctx.JSON(200, userGuilds[token])
			}
		} else {
			guilds, err := helpers.GetUserGuilds(session, token)

			if err != nil {
				ctx.JSON(500, gin.H{
					"message": "Server Error",
				})

				fmt.Println(err)

				return
			}

			if manageable == "true" || manageable == "1" {
				g := []models.Guild{}

				for _, guild := range guilds {
					if guild.IsManageable() {
						g = append(g, guild)
					}
				}

				ctx.JSON(200, g)
			} else {
				ctx.JSON(200, guilds)
			}

			userGuilds[token] = guilds

			go func() {
				time.Sleep(time.Minute * 2)
				delete(userGuilds, token)
			}()
		}
	})
}