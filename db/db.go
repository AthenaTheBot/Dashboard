package db

import (
	"context"
	"time"

	"athena.bot/models"
	"athena.bot/utils"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Init(url string) (*mongo.Client, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 10 * time.Second)

	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(url))

	if err != nil {
		utils.Log(models.ERROR, "An error occured while connecting database.")

		return &mongo.Client{}, err
	}

	return client, nil
}