package models

import (
	"fmt"

	"github.com/bwmarrin/discordgo"
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
	ValidModules 	[]string
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
	Text 	[]discordgo.Channel `json:"text"`
	Voice 	[]discordgo.Channel `json:"voice"`
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
	Language	string `json:"language" bson:"language" validate:"required,oneof='en_US' 'tr_TR'"`
}

type ModerationModule struct {
	AdminRole 	string			`json:"adminRole" bson:"adminRole"`
	ModRole 	string			`json:"modRole" bson:"modRole"`
	AutoRole 	string			`json:"autoRole" bson:"autoRole"`
	Warnings 	[]UserWarning	`json:"warnings" bson:"warnings"`
}

type WelcomerEmbedAuthor struct {
	Name 	string `json:"name" bson:"name"` 
	Icon 	string `json:"icon" bson:"icon"`
	Url 	string `json:"url" bson:"url"`
}

type WelcomerEmbedFooter struct {
	Icon string `json:"icon" bson:"icon"`
	Text string `json:"text" bson:"text"`
}

type WelcomerEmbed struct {
	Author 			WelcomerEmbedAuthor 	`json:"author" bson:"author"`
	Title 			string 					`json:"title" bson:"title"`
	Description 	string 					`json:"description" bson:"description"`
	Thumbnail 		string 					`json:"thumbnail" bson:"thumbnail"`
	Image 			string					`json:"image" bson:"image"`
	Url 			string 					`json:"url" bson:"url"`
	Color 			string					`json:"color" bson:"color"`
	Footer 			WelcomerEmbedFooter		`json:"footer" bson:"footer"`
}

type WelcomerMessage struct {
	Content 	string			`json:"content" bson:"content"`
	Embed 		WelcomerEmbed 	`json:"embed" bson:"embed"`
}

type Welcomer struct {
	Enabled 	bool			`json:"enabled" bson:"enabled"`
	Message 	WelcomerMessage	`json:"message" bson:"message"`
	Channel 	string			`json:"channel" bson:"channel"`
}

type WelcomerModule struct {
	MessageToChannel Welcomer `json:"messageToChannel" bson:"messageToChannel"`
}

type Modules struct {
	SettingsModule 		`json:"settings" bson:"settings"`
	ModerationModule 	`json:"moderation" bson:"moderation"`
	WelcomerModule		`json:"welcomer" bson:"welcomer"`
	Fun   interface{} 	`json:"fun" bson:"fun"`
	Utils interface{} 	`json:"utils" bson:"utils"`
}

type Guild struct {
	GuildPreview
	Channels 						`json:"channels" bson:"channels"`
	Roles 		[]discordgo.Role	`json:"roles" bson:"roles"`
	Modules 						`json:"modules" bson:"modules"`
}

type TooManyRequest struct {
	Message 	string 	`json:"message"`
	RetryAfter 	int 	`json:"retry_after"`
	Global 		bool 	`json:"global"`
}

func (guild GuildPreview) IsManageable() bool {
	manageable := false

	for _, permission := range guild.Permissions {
		if permission == "ADMINISTRATOR" || permission == "MANAGE_GUILD" || permission == "MANAGE_ROLES" {
			manageable = true
			break
		}
	}

	return manageable
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
