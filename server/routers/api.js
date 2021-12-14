const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const encryptor = require("simple-encryptor")(
  "aaüv.?ğğdlvmpqewmfnıpasd124863133u"
);

let commandsCache = [];

// Helper Functions
const wait = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

const capitalizeText = (text) => {
  const firstLetter = text.slice(0, 1).toUpperCase();
  const restText = text.slice(1, text.length);
  return firstLetter + restText;
};

// General routers
router.get("/commands", async (req, res) => {
  if (!commandsCache || commandsCache.length == 0) {
    try {
      const commands = JSON.parse(
        await fs.readFileSync(
          path.join(__dirname, "..", "data", "commands.json"),
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

  res.status(200).json({ status: 200, data: commandsCache }).end();
});

// General routers
router.get("/commands", (req, res) => {
  if (!commandsCache || commandsCache.length == 0) {
    const categories = fs.readdirSync(
      path.join(__dirname, "..", "..", "..", "Commands")
    );
    categories.forEach((category) => {
      const categoryCommands = [];
      const categoryCommandFiles = fs
        .readdirSync(
          path.join(__dirname, "..", "..", "..", "Commands", category)
        )
        .filter((file) => file.endsWith(".js"));
      categoryCommandFiles.forEach((categoryCommandFile) => {
        let categoryCommand;
        try {
          categoryCommand = new (require(path.join(
            __dirname,
            "..",
            "..",
            "..",
            "Commands",
            category,
            categoryCommandFile
          )))();
        } catch (err) {
          return;
        }

        if (
          !categoryCommand.name ||
          !categoryCommand.required_perms ||
          !categoryCommand.required_bot_perms
        )
          return;
        delete categoryCommand["locales"];
        delete categoryCommand["options"];
        delete categoryCommand["aliases"];
        categoryCommands.push(categoryCommand);
      });

      commandsCache.push({ category: category, commands: categoryCommands });
    });
  }

  res.status(200).json({ status: 200, data: commandsCache }).end();
});

// Users routers
router.get("/users/@me", (req, res) => {
  if (!req.cookies?.session)
    return res.status(400).json({ status: 400, message: "Bad Request" }).end();
  else {
    const data = encryptor.decrypt(req.cookies.session);
    if (!data)
      return res.status(400).json({ status: 400, message: "Bad Requet" }).end();
    delete data["key"];
    return res.status(200).json({ status: 200, data: data }).end();
  }
});

router.get("/users/:id", (req, res) => {
  if (!req.params?.id || req.params?.id.length != 18 || isNaN(req.params.id))
    return res.status(400).json({ status: 400, message: "Bad Requst" }).end();

  return res
    .status(503)
    .json({ status: 503, message: "Service Unavailable" })
    .end();
});

module.exports = router;
