import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import config from "../config.json";

dayjs.extend(localizedFormat);

const logger = async (req: Request, res: Response, next: NextFunction) => {
  if (config.debug) return;

  const logFilePath = path.join(__dirname, "..", "..", "logs", "requests.log");
  let logData = `[${dayjs().format("L LTS")}]:  Client IP: ${
    req.ip
  }, Path IP: ${req.path?.toString()}`;

  try {
    if (fs.existsSync(logFilePath)) {
      const logFile = await fs.readFileSync(logFilePath, "utf-8");
      if (logFile) {
        logData = logFile.concat("\n", logData);
      }
    }

    await fs.writeFileSync(logFilePath, logData, "utf-8");
  } catch (err) {
    console.error(err);
  }

  next();
};

export default logger;
