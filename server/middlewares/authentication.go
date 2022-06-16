package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func Authentication() func(*gin.Context) {
	return func(ctx *gin.Context)  {
		session, _ := ctx.Cookie("session")

		if session == "" {
			ctx.AbortWithStatus(http.StatusUnauthorized)
		}
	}
}