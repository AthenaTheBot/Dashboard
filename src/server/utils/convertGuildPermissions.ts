import { Permissions } from "discord.js";
import { Guild } from "../constants";

const convertGuildPermissions = (guild: Guild): string[] => {
  const permissions = new Permissions(guild.permissions_new as any).toArray();

  return permissions;
};

export default convertGuildPermissions;
