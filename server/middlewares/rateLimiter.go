package middlewares

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func RateLimiter(hits map[string] int, hitLimit int) func(*gin.Context)  {
	return func(ctx *gin.Context)  {
		ip := ctx.ClientIP()

		hits[ip] = hits[ip] + 1

		if hits[ip] == 1 {
			go func() {
				time.Sleep(time.Second * 60)
				delete(hits, ip)
			}()
		}

		if hits[ip] > hitLimit {
			ctx.AbortWithStatus(http.StatusTooManyRequests)
		}
	}
}