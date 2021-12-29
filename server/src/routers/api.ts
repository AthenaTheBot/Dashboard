import express from "express";
import fs from "fs";
import path from "path";
import axios from "axios";
import config from "../../config.json";
import { Guild, User, Command } from "../constants";
import { botClient } from "../index";
import { Permissions } from "discord.js";

// Router instance
const router = express.Router();

// Commands cache
let commandsCache: any[] = [];
let users: Map<string, User> = new Map();

// Helper functions
const getCurrentUser = async (accessToken: string): Promise<User | null> => {
  try {
    const serverRes = await axios.get(config.oauthEndpoints.getCurrentUser, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return serverRes.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getCurrentUserGuilds = async (
  accessToken: string
): Promise<Guild[] | null> => {
  try {
    const serverRes = await axios.get(
      config.oauthEndpoints.getCurrentUserGuilds,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return serverRes.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const convertGuildPermissions = (guild: Guild): string[] => {
  const permissions = new Permissions(guild.permissions_new as any).toArray();

  return permissions;
};

const checkGuildAvailability = (guildId: string): boolean => {
  return botClient.guilds.cache.get(guildId) ? true : false;
};

const capitalizeText = (text: string) => {
  const firstLetter = text.slice(0, 1).toUpperCase();
  const restText = text.slice(1, text.length);
  return firstLetter + restText;
};

// Routers
router.get("/commands", async (req, res) => {
  if (!commandsCache || commandsCache.length == 0) {
    try {
      const commands: Command[] = JSON.parse(
        await fs.readFileSync(
          path.join(__dirname, "..", "..", "..", "data", "commands.json"),
          "utf-8"
        )
      );

      const categories = [];

      for (var i = 0; i < commands.length; i++) {
        const categorySeen =
          categories.filter(
            (x) => x.category == capitalizeText(commands[i].category)
          ).length == 0
            ? false
            : true;

        if (categorySeen) {
          categories
            .find((x) => x.category == capitalizeText(commands[i].category))
            ?.commands?.push(commands[i]);
        } else {
          categories.push({
            category: capitalizeText(commands[i].category),
            commands: [commands[i]],
          });
        }
      }

      commandsCache = categories;
    } catch (err) {
      res.status(500).json({ status: 500, message: "Server Error" }).end();
      console.log(err);
      return;
    }
  }

  res.status(200).json(commandsCache).end();
});

// Get current user
router.get("/users/@me", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.status(400).json({ message: "Bad Request" }).end();

  const cache = users.get(session);

  if (cache) return res.status(200).json(cache).end();

  const user = await getCurrentUser(session);

  if (!user) return res.status(500).json({ message: "Server Error" }).end();

  res.status(200).json(user).end();

  users.set(session, user);

  setTimeout(() => {
    users.delete(session);
  }, 1000 * 60 * config.cacheTimeouts.users);
});

router.get("/users/@me/guilds", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.status(400).json({ message: "Bad Request" }).end();

  const guilds = await getCurrentUserGuilds(session);

  if (!guilds || !Array.isArray(guilds))
    return res.status(500).json({ message: "Server Error" }).end();

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

  const manageableGuilds = guilds.filter(
    (x) =>
      (x.permissions as string[]).includes("ADMINISTRATOR") ||
      (x.permissions as string[]).includes("MANAGE_GUILD")
  );

  return res.status(200).json(manageableGuilds).end();
});

router.get("/*", (req, res) => {
  res.status(400).json({ message: "Bad Request" }).end();
});

export default router;
