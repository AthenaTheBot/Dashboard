import fs from "fs";
import path from "path";
import { Config } from "../constants";

const loadConfig = (configPath: string): Config | null => {
  try {
    const configFile = fs.readFileSync(path.normalize(configPath), "utf-8");

    const config = JSON.parse(configFile) as Config;

    return config;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export default loadConfig;
