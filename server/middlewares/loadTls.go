package middlewares

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/unrolled/secure"
)

func LoadTls(port int) func(*gin.Context) {
	return func(ctx *gin.Context) {
		middleware := secure.New(secure.Options{
			SSLRedirect: true,
			SSLHost:     fmt.Sprintf("localhost:%d", port),
		})

		err := middleware.Process(ctx.Writer, ctx.Request)

		if err != nil {
			fmt.Println(err)
			ctx.AbortWithStatus(http.StatusInternalServerError)
			return
		}
		ctx.Next()
	}
}