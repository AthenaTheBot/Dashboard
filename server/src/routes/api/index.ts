import express from "express";
import fs from "fs";
import path from "path";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import capitalizeText from "../../utils/capitalizeText";
import { Command } from "../../constants";
import guildsRoute from "./guilds";
import usersRoute from "./users";
import { config } from "../..";

dayjs.extend(localizedFormat);

// Router instance
const router = express.Router();

router.use("/guilds", guildsRoute);
router.use("/users", usersRoute);

let commandsCache: any[] = [];

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
      res.serverError();
      return;
    }
  }

  res.successfull({ data: commandsCache });
});

router.get("/available-languages", (req, res) => {
  res.successfull({ data: config.availableLanguages });
});

router.get("/*", (req, res) => {
  res.badRequest();
});

export default router;
