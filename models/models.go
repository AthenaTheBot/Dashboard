package models

import (
	"fmt"
	"reflect"
)

type BotConfig struct {
	ClientId 		string
	ClientSecret 	string
	RedirectUri 	string
	Token 			string
}

type Config struct {
	Debug     		bool
	Port      		int
	RequestLimit 	int
	Database  		string
	Bot 			BotConfig
	Redirects 		[]Redirect
}

type Date struct {
	Hour   string
	Minute string
	Day    string
	Month  string
	Year   string
}

type Redirect struct {
	Name 		string
	Destination string
}

type AccessTokenResponse struct {
	AccessToken 	string `json:"access_token"`
  	TokenType 		string `json:"token_type"`
  	ExpiresIn 		int	   `json:"expires_in"`
  	RefreshToken 	string `json:"refresh_token"`
  	Scope			string `json:"scope"`
}

type Command struct {
	Name 					string 		`json:"name"`
	Aliases	 				[]string 	`json:"aliases"`
	Description 			string 		`json:"description"`
	Category 				string		`json:"category"`
	Usage 					string 		`json:"usage"`
	Cooldown 				int			`json:"cooldown"`
	RequiredPermissions 	[]string 	`json:"required_perms"`
	RequiredBotPermissions	[]string	`json:"required_bot_perms"`
}

type CommandCategory struct {
	Category string 	`json:"category"`
	Commands []Command 	`json:"commands"`
}

type User struct {
	Id 			 	string  `json:"id"`
	Username	 	string  `json:"username"`
	Discriminator 	string  `json:"discriminator"`
	Avatar 			string  `json:"avatar"`
	Bot 			bool    `json:"bot"`
	System 			bool    `json:"system"`
	MfaEnabled 		bool	`json:"mfa_enabled"`
	Banner 			string	`json:"banner"`
	AccentColor 	int		`json:"accent_color"`
	Color 			string
	Locale 			string	`json:"locale"`
	Verified 		bool	`json:"verified"`
	Email 			string	`json:"email"`
	Flags 			int		`json:"flags"`
	PremiumType 	int		`json:"premium_type"`
	PublicFlags 	int		`json:"public_falgs"`
}

type GuildRawPreview struct {
	Id	 				string 	 `json:"id"`
	Name 				string	 `json:"name"`
	Icon 				string	 `json:"icon"`
	Owner 				bool	 `json:"owner"`
	PermissionsBit 		int	 	 `json:"permissions"`
	Features 			[]string `json:"features"`
}

type GuildPreview struct {
	Id	 				string 	 `json:"id"`
	Name 				string	 `json:"name"`
	Icon 				string	 `json:"icon"`
	Owner 				bool	 `json:"owner"`
	Available			bool 	 `json:"available" default:"false"`
	Permissions 		[]string `json:"permissions"`
	Features 			[]string `json:"features"`
}

type Channels struct {
	Text 	int `json:"text"`
	Voice 	int `json:"voice"`
}

type UserWarning struct {
	Id 			string 	 `json:"id"`
	Warnings 	[]string `json:"warnings"`
}

type Language struct {
	Id 		string `json:"id"`
	Label 	string `json:"label"`
}

type SettingsModule struct {
	Prefix 		string `json:"prefix" bson:"prefix"`
	Language	string `json:"language" bson:"language"`
}

type ModerationModule struct {
	AdminRole 	string			`json:"adminRole" bson:"adminRole"`
	ModRole 	string			`json:"modRole" bson:"modRole"`
	AutoRole 	string			`json:"autoRole" bson:"autoRole"`
	Warnings 	[]UserWarning	`json:"warnings" bson:"warnings"`
}

type Modules struct {
	SettingsModule 		`json:"settings" bson:"settings"`
	ModerationModule 	`json:"moderation" bson:"moderation"`
	Fun   interface{} 	`json:"fun" bson:"fun"`
	Utils interface{} 	`json:"utils" bson:"utils"`
}

type Guild struct {
	GuildPreview
	Channels 	`json:"channels"`
	Modules 	`json:"modules" bson:"modules"`
}

type TooManyRequest struct {
	Message 	string 	`json:"message"`
	RetryAfter 	int 	`json:"retry_after"`
	Global 		bool 	`json:"global"`
}

func (guild GuildPreview) IsManageable() bool {
	sliceContains := func(s interface{}, k any) (bool) {
		slice := reflect.ValueOf(s)
		contains := false

		if slice.Kind() != reflect.Slice {
			return contains
		}

		for i := 0; i < slice.Len(); i ++ {
			el := slice.Index(i).Interface()

			if el == k {
				contains = true
				break
			}
		}

		return contains
	}

	
	s := sliceContains(guild.Permissions, "ADMINISTRATOR") || sliceContains(guild.Permissions, "MANAGE_GUILD") || sliceContains(guild.Permissions, "MANAGE_ROLES")

	return s
}

func (d Date) ToString() string {
	return fmt.Sprintf("%s/%s/%s %s:%s", d.Day, d.Month, d.Year, d.Hour, d.Minute)
}

type LogTypes string
const (
	ERROR   LogTypes = "ERROR"
	SUCCESS LogTypes = "SUCCESS"
	WARN    LogTypes = "WARN"
)
