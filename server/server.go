package server

import (
	"fmt"
	"os"
	"path/filepath"

	"athena.bot/models"
	"athena.bot/server/middlewares"
	"athena.bot/server/routes"
	"athena.bot/utils"
	"github.com/bwmarrin/discordgo"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func Init(config models.Config, db *mongo.Client, botSession *discordgo.Session) {
	if config.Debug {
		gin.SetMode(gin.DebugMode)
	} else {
		gin.SetMode(gin.ReleaseMode)
	}

	// Cache
	requests := map[string]int{}
	users := map[string]models.User{}
	userGuilds := map[string][]models.GuildPreview{}

	server := gin.New()
	path, _ := os.Getwd()

	//server.Use(gin.Logger())
	server.Use(gin.Recovery())
	server.Use(middlewares.RateLimiter(requests, config.RequestLimit))
	server.Use(static.Serve("/", static.LocalFile(filepath.Join(path, "/frontend/build"), true)))

	routes.RedirectsRoute(server.Group("/redirects"), config.Redirects)
	routes.OauthRoute(server.Group("/oauth"), config.Bot)
	routes.ApiRoute(server.Group("/api"), botSession, db, users, userGuilds)

	server.NoRoute(func(context *gin.Context) {
		context.File(filepath.Join(path, "/frontend/build/index.html"))
	})

	appErr := server.Run(fmt.Sprintf("localhost:%d", config.Port))

	if appErr != nil {
		utils.Log(models.ERROR, "An error occured while starting server")
		os.Exit(1)
	} 
}