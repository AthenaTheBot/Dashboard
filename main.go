package main

import (
	"fmt"
	"os"
	"path/filepath"

	"athena.bot/bot"
	"athena.bot/db"
	"athena.bot/models"
	"athena.bot/server"
	"athena.bot/utils"
)

func main() {
	config, configErr := utils.LoadConfig()

	if configErr != nil {
		utils.Log(models.ERROR, "Config cannot be loaded properly, quitting.")
		os.Exit(1)
	} else {
		utils.Log(models.SUCCESS, "Loaded config file.")
	}

	dbClient, dbErr := db.Init(config.Database)

	if dbErr != nil {
		utils.Log(models.ERROR, "Cannot connect database, quitting.")
		os.Exit(1)
	} else {
		utils.Log(models.SUCCESS, "Connected database.")
	}

	botSession, botErr := bot.Init(config.Bot.Token)

	if botErr != nil {
		utils.Log(models.ERROR, "Bot cannot be initialized, quitting.")
		os.Exit(1)
	} else {
		utils.Log(models.SUCCESS, fmt.Sprintf("Initialized bot client. (%s#%s)", botSession.State.User.Username, botSession.State.User.Discriminator))
	}

	server := server.SetupRouter(config, dbClient, botSession)

	var serverStartErr error
	if config.Debug {
		serverStartErr = server.Run(fmt.Sprintf(":%d", config.Port))
	} else {
		currentPath, _ := os.Getwd()
		keysDir := filepath.Join(currentPath, "keys")
		serverStartErr = server.RunTLS(fmt.Sprintf(":%d", config.Port), filepath.Join(keysDir, "cert.pem"), filepath.Join(keysDir, "privkey.pem"))
	}

	if serverStartErr != nil {
		utils.Log(models.ERROR, "An error occured while starting server.")
	}
}	