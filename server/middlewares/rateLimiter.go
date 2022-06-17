package middlewares

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/sync/syncmap"
)

func RateLimiter(hits syncmap.Map, hitLimit int) func(*gin.Context)  {
	return func(ctx *gin.Context)  {
		ip := ctx.ClientIP()
		ipHitCount, ipHitCountExists := hits.Load(ip)

		if !ipHitCountExists {
			hits.Store(ip, 1)
			go func() {
				time.Sleep(time.Second * 60)
				hits.Delete(ip)
			}()
			return
		} else {
			ipHitCount = ipHitCount.(int) + 1
			hits.Store(ip, ipHitCount)
		}

		if (ipHitCount.(int)) > hitLimit {
			ctx.AbortWithStatus(http.StatusTooManyRequests)
		}
	}
}