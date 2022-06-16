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
	Name string
	Destination string
}

type AccessTokenResponse struct {
	AccessToken 	string `json:"access_token"`
  	TokenType 		string `json:"token_type"`
  	ExpiresIn 		int	   `json:"expires_in"`
  	RefreshToken 	string `json:"refresh_token"`
  	Scope			string `json:"scope"`
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

type GuildRaw struct {
	Id	 				string 	 `json:"id"`
	Name 				string	 `json:"name"`
	Icon 				string	 `json:"icon"`
	Owner 				bool	 `json:"owner"`
	PermissionsBit 		int	 	 `json:"permissions"`
	Features 			[]string `json:"features"`
}

type Guild struct {
	Id	 				string 	 `json:"id"`
	Name 				string	 `json:"name"`
	Icon 				string	 `json:"icon"`
	Owner 				bool	 `json:"owner"`
	Available			bool 	 `json:"available" default:"false"`
	Permissions 		[]string `json:"permissions"`
	Features 			[]string `json:"features"`
}

func (guild Guild) IsManageable() bool {
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
