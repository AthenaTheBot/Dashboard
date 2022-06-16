package routes

import (
	"athena.bot/models"
	"github.com/gin-gonic/gin"
)

func RedirectsRoute(r *gin.RouterGroup, redirects []models.Redirect) {
	r.GET("/:link", func(ctx *gin.Context) {
		l := ctx.Param("link")

		var redirectTo string
		for _, redirect := range redirects {
			if redirect.Name == l {
				redirectTo = redirect.Destination
				break
			}
		}

		if redirectTo != "" {
			ctx.Redirect(302, redirectTo)
		} else {
			ctx.Redirect(302, "/")
		}
	})
}