package permissions

var Permissions = []string{
	"CREATE_INSTANT_INVITE",
	"KICK_MEMBERS",
	"BAN_MEMBERS",
	"ADMINISTRATOR",
	"MANAGE_CHANNELS",
	"MANAGE_GUILD",
	"ADD_REACTIONS",
	"VIEW_AUDIT_LOG",
	"PRIORITY_SPEAKER",
	"STREAM",
	"VIEW_CHANNEL",
	"SEND_MESSAGES",
	"SEND_TTS_MESSAGES",
	"MANAGE_MESSAGES",
	"EMBED_LINKS",
	"ATTACH_FILES",
	"READ_MESSAGE_HISTORY",
	"MENTION_EVERYONE",
	"USE_EXTERNAL_EMOJIS",
	"VIEW_GUILD_INSIGHTS",
	"CONNECT",
	"SPEAK",
	"MUTE_MEMBERS",
	"DEAFEN_MEMBERS",
	"MOVE_MEMBERS",
	"USE_VAD",
	"CHANGE_NICKNAME",
	"MANAGE_NICKNAMES",
	"MANAGE_ROLES",
	"MANAGE_WEBHOOKS",
	"MANAGE_EMOJIS_AND_STICKERS",
	"USE_APPLICATION_COMMANDS",
	"REQUEST_TO_SPEAK",
	"MANAGE_EVENTS",
	"MANAGE_THREADS",
	"CREATE_PUBLIC_THREADS",
	"CREATE_PRIVATE_THREADS",
	"USE_EXTERNAL_STICKERS",
	"SEND_MESSAGES_IN_THREADS",
	"USE_EMBEDDED_ACTIVITIES",
	"MODERATE_MEMBERS",
}

var PermissionBits = []int{
	0x0000000000000001,
	0x0000000000000002,
	0x0000000000000004,
	0x0000000000000008,
	0x0000000000000010,
	0x0000000000000020,
	0x0000000000000040,
	0x0000000000000080,
	0x0000000000000100,
	0x0000000000000200,
	0x0000000000000400,
	0x0000000000000800,
	0x0000000000001000,
	0x0000000000002000,
	0x0000000000004000,
	0x0000000000008000,
	0x0000000000010000,
	0x0000000000020000,
	0x0000000000040000,
	0x0000000000080000,
	0x0000000000100000,
	0x0000000000200000,
	0x0000000000400000,
	0x0000000000800000,
	0x0000000001000000,
	0x0000000002000000,
	0x0000000004000000,
	0x0000000008000000,
	0x0000000010000000,
	0x0000000020000000,
	0x0000000040000000,
	0x0000000080000000,
	0x0000000100000000,
	0x0000000200000000,
	0x0000000400000000,
	0x0000000800000000,
	0x0000001000000000,
	0x0000002000000000,
	0x0000004000000000,
	0x0000008000000000,
	0x0000010000000000,
}

func ParseBitField(bits int) []string {
	parsed := []string{}

	for i, perm := range Permissions {
		if (bits & PermissionBits[i]) == PermissionBits[i] {
			parsed = append(parsed, perm)
		}
	}

	return parsed
}