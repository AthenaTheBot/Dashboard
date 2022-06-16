package utils

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"strconv"
	"time"

	"athena.bot/models"
	"github.com/fatih/color"
)

func Log(t models.LogTypes, m string) {
	now := time.Now()
	date := models.Date{
		Day: strconv.Itoa(now.Day()),
		Month: strconv.Itoa(int(now.Month())),
		Year: strconv.Itoa(now.Year()),
		Hour: strconv.Itoa(now.Hour()),
		Minute: strconv.Itoa(now.Minute()),
	}
	var tag string

	l := color.New(color.BgWhite, color.FgBlack, color.Bold).SprintFunc()

	switch(t) {
		case models.SUCCESS:
			s := color.New(color.BgGreen, color.FgBlack, color.Bold).SprintFunc()
			tag = s(" SUCCESS ")
		case models.ERROR:
			e := color.New(color.BgRed, color.FgBlack, color.Bold).SprintFunc()
			tag = e(" ERROR ")
		case models.WARN:
			w := color.New(color.BgYellow, color.FgBlack, color.Bold).SprintFunc()
			tag = w(" WARN ")
		default:
			tag = l(" LOG ")
	}

	fmt.Printf("%s %s: %s\n", l(" "  + date.ToString() + " "), tag, m)
}

func LoadConfig() (models.Config, error) {
	directory, dirErr := os.Getwd()

	if dirErr != nil {
		Log(models.ERROR, "An error occured while getting current working directory.")

		return models.Config{}, dirErr
	}

	bs, readErr := os.ReadFile(filepath.Join(directory, "/config.json"))

	if readErr != nil {

		Log(models.ERROR, "An error occured while reading config file.")

		return models.Config{}, readErr
	}

	config := models.Config{}

	parseErr := json.Unmarshal(bs, &config)

	if parseErr != nil {
		Log(models.ERROR, "An error occued while parsing config file.")

		return models.Config{}, parseErr
	}

	return config, nil
}

func SliceContains(s interface{}, k any) (bool, error) {
	slice := reflect.ValueOf(s)
	contains := false

	if slice.Kind() != reflect.Slice {
		return contains, errors.New("Type not allowed!")
	}

	for i := 0; i < slice.Len(); i ++ {
		el := slice.Index(i).Interface()
		
		if el == k {
			contains = true
			break
		}
	}

	return contains, nil
}

