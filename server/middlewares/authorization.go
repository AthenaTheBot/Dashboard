package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthorizationType string
const (
	COOKIE 	AuthorizationType = "COOKIE"
)

func Authorization(authType AuthorizationType) func(*gin.Context) {
	switch(authType) {
		case COOKIE:
			return func(ctx *gin.Context)  {
				session, _ := ctx.Cookie("session")

				if session == "" {
					ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
						"message": "Unauthorized",
					})

					return
				}
			
				ctx.Next()
			}

		default:
			return func (ctx *gin.Context)  {
				ctx.Next()
			}
	}
}