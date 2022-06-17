package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authorization() func(*gin.Context) {
	return func(ctx *gin.Context)  {
		session, _ := ctx.Cookie("session")

		if session == "" {
			ctx.JSON(http.StatusUnauthorized, gin.H{
				"message": "Unauthorized",
			})

			ctx.Abort()
		}
	}
}