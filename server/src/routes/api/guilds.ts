import express from "express";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import GuildModel from "../../models/Guild";
import DashCategories from "../../schemas/DashCategories";
import getCurrentUserGuilds from "../../utils/getUserGuilds";
import { bot } from "../../index";
import { connection } from "mongoose";

dayjs.extend(localizedFormat);

const router = express.Router();

router.get("/:id", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.status(400).json({ message: "Bad Request" }).end();

  const guilds = await getCurrentUserGuilds(session, true);

  const guild = guilds?.find((x) => x.id === req.params.id);

  if (!guild) return res.status(400).json({ message: "Unauthorized" }).end();

  if (!connection)
    return res.status(500).json({ message: "Server Error" }).end();

  let guildData = await GuildModel.findById(guild.id).catch((err) => null);

  if (!guildData) {
    guildData = await GuildModel.create({
      _id: guild.id,
      settings: {
        premium: false,
        prefix: "at!",
        language: "en_US",
      },
      modules: {
        moderationModule: {
          adminRole: null,
          modRole: null,
          warnings: [],
        },
        funModule: {},
        utilsModule: {},
      },
      lastUpdated: dayjs().format("L LT"),
    });
  }

  // Delete unncessary meta info
  delete guildData._doc._id;
  delete guildData._doc.lastUpdated;
  delete guildData._doc.settings.premium;
  delete guild.permissions_new;
  delete guild.features;

  const extraGuildData = await bot.guilds.cache.get(guild.id);

  Object.assign(guild, {
    members: extraGuildData?.memberCount,
    channels: {
      text: extraGuildData?.channels.cache.filter((x) => x.type == "GUILD_TEXT")
        .size,
      voice: extraGuildData?.channels.cache.filter(
        (x) => x.type == "GUILD_VOICE"
      ).size,
    },
    roles: extraGuildData?.roles.cache.size,
    createdAt: dayjs(extraGuildData?.createdAt).format("L"),
  });

  return res.status(200).json({ ...guild, ...guildData._doc });
});

router.patch("/:id/:category", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.status(400).json({ message: "Bad Request" }).end();

  const guilds = await getCurrentUserGuilds(session, true);

  const guild = guilds?.find((x) => x.id === req.params.id);

  if (!guild) return res.status(401).json({ message: "Unauthorized" }).end();

  if (req.params?.category === "settings") {
    try {
      await DashCategories.SettingsCategorySchema.validateSync(req.body, {
        strict: true,
      });

      req.body = await DashCategories.SettingsCategorySchema.validateSync(
        req.body,
        {
          stripUnknown: true,
        }
      );
    } catch (err) {
      res.status(400).json({ message: "Bad Request" }).end();
      return;
    }

    req.body.premium = false;

    try {
      await connection
        .collection("guilds")
        .updateOne(
          { _id: req.params.id as any },
          { $set: { settings: req.body } }
        );
    } catch (err) {
      res.status(500).json({ message: "Server Error" }).end();
      return;
    }

    res.status(200).json({ message: "Successfull" }).end();
  }
});

export default router;
