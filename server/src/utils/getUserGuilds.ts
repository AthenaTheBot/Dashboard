import axios from "axios";
import convertGuildPermissions from "./convertGuildPermissions";
import checkGuildAvailability from "./checkGuildAvailability";
import { config, cache } from "../index";
import { Guild } from "../constants";

const getCurrentUserGuilds = async (
  accessToken: string,
  returnManageable?: boolean,
  force?: boolean
): Promise<Guild[] | null> => {
  const cachedUserGuilds = cache.userGuilds.get(accessToken);

  if (!force && cachedUserGuilds) {
    if (returnManageable) {
      return cachedUserGuilds.filter(
        (x) =>
          (x.permissions as string[]).includes("ADMINISTRATOR") ||
          (x.permissions as string[]).includes("MANAGE_GUILD")
      );
    } else return cachedUserGuilds;
  }

  try {
    const serverRes = await axios.get(
      config.oauthEndpoints.getCurrentUserGuilds,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const guilds = serverRes.data as Guild[];

    for (var i = 0; i < (guilds as Guild[]).length; i++) {
      (guilds as Guild[])[i].permissions = convertGuildPermissions(guilds[i]);

      Object.assign((guilds as Guild[])[i], {
        available: checkGuildAvailability(guilds[i].id),
      });

      if (guilds[i].icon) {
        (guilds as Guild[])[
          i
        ].icon = `https://cdn.discordapp.com/icons/${guilds[i].id}/${guilds[i].icon}`;
      }
    }

    cache.userGuilds.set(accessToken, guilds);

    setTimeout(
      () => cache.userGuilds.delete(accessToken),
      config.cacheTimeouts.userGuilds
    );

    if (returnManageable)
      return guilds.filter(
        (x) =>
          (x.permissions as string[]).includes("ADMINISTRATOR") ||
          (x.permissions as string[]).includes("MANAGE_GUILD")
      );
    else return guilds;
  } catch (err: any) {
    if (!err?.data?.retry_after) {
      console.log(err);
    }
    return null;
  }
};

export default getCurrentUserGuilds;