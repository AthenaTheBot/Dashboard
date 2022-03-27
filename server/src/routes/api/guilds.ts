import express from "express";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import GuildModel from "../../models/Guild";
import DashModules from "../../schemas/DashModules";
import getCurrentUserGuilds from "../../utils/getUserGuilds";
import { bot } from "../../index";
import { connection } from "mongoose";
import { Guild, GuildMember, Role } from "discord.js";
import updateServerModule from "../../utils/updateServerModule";
import getCurrentUser from "../../utils/getUser";
import authController from "../../middlewares/authController";

dayjs.extend(localizedFormat);

const router = express.Router();

router.use(authController);

router.get("/:id", async (req, res) => {
  const session = req.signedCookies?.session;

  const guilds = await getCurrentUserGuilds(session, false);

  const guild = guilds?.find((x) => x.id === req.params.id);

  if (!guild) return res.unauthorized();

  if (!connection) return res.serverError();

  let guildData = await GuildModel.findById(guild.id).catch((err) => null);

  if (!guildData) {
    guildData = await GuildModel.create({
      _id: guild.id,
      modules: {
        settings: {
          prefix: "at!",
          language: "en_US",
        },
        moderation: {
          adminRole: null,
          modRole: null,
          autoRole: null,
          warnings: [],
        },
        fun: {},
        utils: {},
      },
      lastUpdated: dayjs().format("L LT"),
    });
  }

  // Delete unncessary meta info
  delete guildData._doc?._id;
  delete guildData._doc?.lastUpdated;
  delete guild?.permissions_new;
  delete guild?.features;

  const extraGuildData =
    (await bot.guilds.cache.get(guild.id)) ||
    (await bot.guilds.fetch(guild.id));

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

router.get("/:id/getAvailableRoles", async (req, res) => {
  const session = req.signedCookies?.session;

  const guilds = await getCurrentUserGuilds(session, false);

  const guild = guilds?.find((x) => x.id === req.params.id);
  const user = await getCurrentUser(session, false);

  if (!guild || !user) return res.unauthorized();

  const guildData =
    ((await bot.guilds.cache.get(guild.id)) as Guild) ||
    ((await bot.guilds.fetch(guild.id)) as Guild);
  const userData = (await guildData.members.fetch(user?.id)) as GuildMember;

  if (!guildData || !userData) return res.serverError();

  const availableRoles: Role[] = [];

  guildData.roles.cache.forEach((guildRole: Role) => {
    if (
      !guildRole.managed &&
      guildRole.rawPosition != 0 &&
      guildRole.rawPosition <
        (guildData.me?.roles?.highest?.rawPosition || 0) &&
      (guildRole.rawPosition < userData.roles.highest.rawPosition ||
        guildData.ownerId === userData.id)
    ) {
      Object.assign(guildRole, { color: guildRole.hexColor });
      availableRoles.push(guildRole);
    }
  });

  res.successfull({ data: availableRoles });
});

router.patch("/:id/:module", async (req, res) => {
  const session = req.signedCookies?.session;

  const guilds = await getCurrentUserGuilds(session, false);

  const guild = guilds?.find((x) => x.id === req.params.id);

  if (!guild) return res.unauthorized();

  const modules = Object.getOwnPropertyNames(DashModules);

  if (modules.includes(req.params?.module)) {
    try {
      req.body = await (DashModules as any)[req.params?.module].validate(
        req.body,
        {
          stripUnknown: true,
        }
      );

      await (DashModules as any)[req.params?.module].validate(req.body, {
        strict: true,
      });

      const success = await updateServerModule(
        req.params.id,
        req.params.module,
        req.body
      );

      if (success) return res.successfull();
      else return res.serverError();
    } catch (err) {
      return res.badRequest();
    }
  } else {
    res.badRequest();
  }
});

export default router;
