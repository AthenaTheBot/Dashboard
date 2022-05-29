import axios from "axios";
import convertGuildPermissions from "./convertGuildPermissions";
import checkGuildAvailability from "./checkGuildAvailability";
import { config, cache } from "../index";
import { Guild } from "../constants";
let requestInProgress = false;

const getCurrentUserGuilds = async (
  accessToken: string,
  returnManageable?: boolean,
  force?: boolean
): Promise<Guild[] | null | undefined> => {
  if (requestInProgress) {
    console.log("requst in progress waiting 200");
    setTimeout(() => {
      return getCurrentUserGuilds(accessToken, returnManageable, force);
    }, 200);
  } else {
    const cachedUserGuilds = cache.userGuilds.get(accessToken);

    if (!force && cachedUserGuilds) {
      if (returnManageable) {
        return cachedUserGuilds.filter(
          (x) =>
            (x.permissions as string[]).includes("ADMINISTRATOR") ||
            ((x.permissions as string[]).includes("MANAGE_GUILD") &&
              (x.permissions as string[]).includes("MANAGE_ROLES"))
        );
      } else return cachedUserGuilds;
    }

    try {
      requestInProgress = true;

      const serverRes = await axios.get(
        config.oauthEndpoints.getCurrentUserGuilds,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      requestInProgress = false;

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
        config.cacheTimeouts.userGuilds * 1000
      );

      if (returnManageable)
        return guilds.filter(
          (x) =>
            (x.permissions as string[]).includes("ADMINISTRATOR") ||
            ((x.permissions as string[]).includes("MANAGE_GUILD") &&
              (x.permissions as string[]).includes("MANAGE_ROLES"))
        );
      else return guilds;
    } catch (err: any) {
      requestInProgress = false;

      if (err?.toJSON()?.status !== 429) {
        console.log(err);
      } else {
        setTimeout(() => {
          return getCurrentUserGuilds(accessToken, returnManageable, force);
        }, err?.toJSON()?.data?.retry_after + 100);
      }

      return null;
    }
  }
};

export default getCurrentUserGuilds;
