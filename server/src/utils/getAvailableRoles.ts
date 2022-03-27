import { bot } from "../index";
import { Role, GuildMember, Guild } from "discord.js";
import getCurrentUser from "./getUser";
import getCurrentUserGuilds from "./getUserGuilds";

const getAvailableRoles = async (
  accessToken: string,
  guildId: string
): Promise<Role[] | null> => {
  const guilds = await getCurrentUserGuilds(accessToken, false);

  const guild = guilds?.find((x) => x.id === guildId);
  const user = await getCurrentUser(accessToken, false);

  if (!guild || !user) return null;

  const guildData =
    ((await bot.guilds.cache.get(guild.id)) as Guild) ||
    ((await bot.guilds.fetch(guild.id)) as Guild);
  const userData = (await guildData.members.fetch(user?.id)) as GuildMember;

  if (!guildData || !userData) return null;

  const availableRoles: Role[] = [];

  guildData.roles.cache.forEach((guildRole: Role) => {
    if (
      !guildRole.managed &&
      guildRole.rawPosition !== 0 &&
      guildRole.rawPosition <
        (guildData.me?.roles?.highest?.rawPosition || 0) &&
      (guildRole.rawPosition < userData.roles.highest.rawPosition ||
        guildData.ownerId === userData.id)
    ) {
      Object.assign(guildRole, {
        // Discord.JS returning invalid hex color fix
        color: `#${guildRole.hexColor.replaceAll("#", "")}`,
      });

      availableRoles.push(guildRole);
    }
  });

  return availableRoles;
};

export default getAvailableRoles;
