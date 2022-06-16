package bot

import (
	"athena.bot/models"
	"athena.bot/utils"
	"github.com/bwmarrin/discordgo"
)

func Init(token string) (*discordgo.Session, error) {
	s, err := discordgo.New(token)

	if err != nil {
		utils.Log(models.ERROR, "An error occured while creating discordgo session.")
		return &discordgo.Session{}, err
	}

	s.Identify.Intents = discordgo.IntentGuilds

	s.Open()

	return s, nil
}