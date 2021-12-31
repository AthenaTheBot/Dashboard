import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import config from "../config.json";

dayjs.extend(localizedFormat);

const logger = async (req: Request, res: Response, next: NextFunction) => {
  if (config.debug) {
    next();
    return;
  }

  const logFolderPath = path.join(__dirname, "..", "..", "logs");
  const logFilePath = path.join(logFolderPath, "requests.log");
  let logData = `[${dayjs().format("L LTS")}]:  Client IP: ${
    req.ip
  }, Path IP: ${req.path?.toString()}`;

  try {
    // Check if log folder exists if not create log folder
    try {
      await fs.accessSync(logFolderPath);
    } catch (err) {
      await fs.mkdirSync(logFolderPath);
    }

    // Check if log file exits if exists then add currnt data to the variable so that the data will never get lost once we overwrite the file
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
