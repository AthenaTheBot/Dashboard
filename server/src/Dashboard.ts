import fs from "fs";
import path from "path";
import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Discord from "discord.js";
import { Config, Guild, LogType, User } from "./constants";

dayjs.extend(localizedFormat);
colors.enable();

class Dashboard {
  instances: {
    server: express.Express;
    bot: Discord.Client;
  };

  serverPorts: {
    http: number;
    https: number | null;
  };

  cache: {
    users: Map<string, User>;
    userGuilds: Map<string, Guild[]>;
    rateLimits: Map<string, number>;
  };

  dbConnection: mongoose.Connection | null;

  config: Config | null;

  constructor() {
    this.instances = {
      server: express(),
      bot: new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] }),
    };

    this.serverPorts = {
      http: 80,
      https: 443,
    };

    this.cache = {
      users: new Map(),
      userGuilds: new Map(),
      rateLimits: new Map(),
    };

    this.dbConnection = null;
    this.config = null;
  }

  log(text: string, type: LogType = LogType.DEFAULT) {
    let coloredType = ` ${type} `;
    switch (type) {
      case LogType.SUCCESS:
        coloredType = coloredType.bgGreen.black;
        break;

      case LogType.ERROR:
        coloredType = coloredType.bgRed.black;
        break;

      case LogType.WARNING:
        coloredType = coloredType.bgYellow.black;
        break;

      default:
        coloredType = coloredType.bgWhite.black;
    }

    console.log(`[${dayjs().format("L LTS")}]`, `${coloredType}:`, text.trim());
  }

  loadConfig(configPath: string): Config | null {
    try {
      const configFile = fs.readFileSync(path.normalize(configPath), "utf-8");

      const config = JSON.parse(configFile) as Config;

      this.config = config;

      this.log("Loaded config file.", LogType.SUCCESS);

      return config;
    } catch (err) {
      this.log("An error occured while loading config file.", LogType.ERROR);
      return null;
    }
  }

  async connectDB(dbUrl: string): Promise<mongoose.Connection | null> {
    try {
      await mongoose.connect(dbUrl);

      this.dbConnection = mongoose.connection;

      this.log("Connected to the database.", LogType.SUCCESS);

      return mongoose.connection;
    } catch (err) {
      this.log(
        "An error occured while connecing to the database.",
        LogType.ERROR
      );
      return null;
    }
  }

  reditectToHTTPS(req: express.Request, res: express.Response) {
    res.writeHead(301, {
      Location: "https://" + req.headers["host"] + req.url,
    });

    res.end();
  }

  async start(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.config) return reject(new Error("CONFIG_NOT_LOADED"));

      await this.connectDB(this.config.dbUrl);

      if (this.config.debug) {
        this.serverPorts.http = this.config.debugPort;
        this.serverPorts.https = null;
      }

      try {
        await this.instances.bot.login(this.config.auth.botToken);

        this.log("Logged into the discord app.", LogType.SUCCESS);
      } catch (err) {
        this.log((err as any).message, LogType.ERROR);
      }

      resolve();
    });
  }
}

export default Dashboard;
