const express = require("express");
const router = express.Router();
const encryptor = require("simple-encryptor")(
  "aaüv.?ğğdlvmpqewmfnıpasd124863133u"
);
const DiscordOauth2 = require("discord-oauth2");

router.get("/login", (req, res) => {
  let redirect;
  switch (req.query?.redirect) {
    case "dashboard":
      redirect = "dashboard";
      break;

    case "commands":
      redirect = "commands";
      break;

    case "home":
      redirect = "home";
      break;

    default:
      redirect = "home";
      break;
  }

  res.redirect(
    process.env.LOGIN_LINK.replace(
      "$REDIRECTURI",
      process.env.REDIRECT_URI.concat("?redirect=" + redirect)
    ).replace("$CLIENTID", process.env.CLIENT_ID)
  );
});

router.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

router.get("/callback", async (req, res) => {
  if (!req.query?.code) return res.redirect("/");

  let redirect;
  switch (req.query?.redirect) {
    case "dashboard":
      redirect = "dashboard";
      break;

    case "commands":
      redirect = "commands";
      break;

    case "home":
      redirect = "home";
      break;

    default:
      redirect = "home";
      break;
  }

  const oauth = new DiscordOauth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI.concat("?redirect=" + redirect),
  });

  const tokenData = await oauth
    .tokenRequest({
      code: req.query.code,
      scope: "identify guilds email",
      grantType: "authorization_code",
    })
    .catch((err) => {});

  if (!tokenData?.access_token) return res.redirect("/error");

  const userData = await oauth.getUser(tokenData.access_token);

  if (!userData) return res.redirect("/error");

  const session = {
    key: tokenData.access_token || null,
    ...userData,
  };

  const expiresInHour = tokenData.expires_in / 3600;

  await res.cookie("session", encryptor.encrypt(session), {
    expires: new Date(Date.now() + expiresInHour * 3600000),
  });

  switch (req.query?.redirect) {
    case "dashboard":
      return res.redirect("/dashboard");

    case "commands":
      return res.redirect("/commands");

    case "home":
      return res.redirect("/");

    default:
      res.redirect("/");
  }
});

module.exports = router;
