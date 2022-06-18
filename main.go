package main

import (
	"fmt"
	"os"

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
		utils.Log(models.SUCCESS, "Initialized bot client.")
	}

	server := server.SetupRouter(config, dbClient, botSession)

	serverRunErr := server.Run(fmt.Sprintf(":%d", config.Port))

	if serverRunErr != nil {
		utils.Log(models.ERROR, "Cannot start http server.")
	}
}	