package server

import (
	"os"
	"path/filepath"

	"athena.bot/models"
	"athena.bot/server/middlewares"
	"athena.bot/server/routes"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
	"golang.org/x/sync/syncmap"
)

func SetupRouter(config models.Config, db *mongo.Client, botSession *discordgo.Session) *gin.Engine {
	if config.Debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Cache
	requests := syncmap.Map{}
	users := syncmap.Map{}
	userGuilds := syncmap.Map{}
	userManageableGuilds := syncmap.Map{}

	server := gin.New()
	path, _ := os.Getwd()

	server.Use(gin.Logger())
	server.SetTrustedProxies([]string{})
	server.Use(middlewares.RateLimiter(requests, config.RequestLimit))
	server.Use(gin.Recovery())
	server.Use(static.Serve("/", static.LocalFile(filepath.Join(path, "/frontend/build"), true)))

	routes.RedirectsRoute(server.Group("/redirects"), config.Redirects)
	routes.OauthRoute(server.Group("/oauth"), config.Bot)
	routes.ApiRoute(server.Group("/api"), config, botSession, db, users, userGuilds, userManageableGuilds)

	server.NoRoute(func(context *gin.Context) {
		context.File(filepath.Join(path, "/frontend/build/index.html"))
	})

	return server
}