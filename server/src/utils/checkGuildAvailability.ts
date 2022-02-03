import { bot } from "../index";

const checkGuildAvailability = (guildId: string): boolean => {
  return bot.guilds.cache.get(guildId) ? true : false;
};

export default checkGuildAvailability;
