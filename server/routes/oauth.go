package routes

import (
	"athena.bot/helpers"
	"athena.bot/models"
	"github.com/gin-gonic/gin"
)

func OauthRoute(r *gin.RouterGroup, botCfg models.BotConfig) {
	r.GET("/login", func(ctx *gin.Context) {
		ctx.Redirect(302, "/redirects/login")
	})

	r.GET("/logout", func(ctx *gin.Context) {
		ctx.SetCookie("session", "", 0, "/", "", true, false)

		ctx.Redirect(302, "/")
	})

	r.GET("/callback", func(ctx *gin.Context) {
		code := ctx.Query("code")

		if code == "" {
			ctx.Redirect(302, "/error")
			return
		}

		resp, err := helpers.ExchangeToken(code, botCfg)

		if err != nil {
			ctx.Redirect(302, "/error")
			return
		}

		// TODO: Fix cookie issue
		ctx.SetCookie("session", resp.AccessToken, (resp.ExpiresIn * 1000) - (1000 * 60 * 60 * 2), "/", "", true, false)

		ctx.Redirect(302, "/")
	})
}