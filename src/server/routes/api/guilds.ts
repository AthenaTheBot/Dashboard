import express from "express";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import GuildModel from "../../models/Guild";
import DashModules from "../../schemas/DashModules";
import getCurrentUserGuilds from "../../utils/getUserGuilds";
import { bot } from "../../index";
import { connection } from "mongoose";
import updateServerModule from "../../utils/updateServerModule";
import getAvailableRoles from "../../utils/getAvailableRoles";
import authController from "../../middlewares/authController";

dayjs.extend(localizedFormat);

const router = express.Router();

router.use(authController);

router.get("/:id", async (req, res) => {
  try {
    const session = req.signedCookies?.session;

    const guilds = await getCurrentUserGuilds(session, true, false);

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
        text: extraGuildData?.channels.cache.filter(
          (x) => x.type === "GUILD_TEXT"
        ).size,
        voice: extraGuildData?.channels.cache.filter(
          (x) => x.type === "GUILD_VOICE"
        ).size,
      },
      roles: extraGuildData?.roles.cache.size,
      createdAt: dayjs(extraGuildData?.createdAt).format("L"),
    });

    let availableRoles = await getAvailableRoles(
      req.signedCookies["session"],
      req.params.id
    ).catch((err) => null);

    if (!availableRoles) availableRoles = [];

    return res.successfull({
      ...guild,
      ...guildData._doc,
      availableRoles: availableRoles,
    });
  } catch (err) {
    res.serverError();
  }
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
