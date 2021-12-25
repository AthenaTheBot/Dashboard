import express from "express";
import config from "../../config.json";

const router = express.Router();

router.get("/support", (req, res) => {
  res.redirect(config.links.support);
});

router.get("/invite", (req, res) => {
  res.redirect(
    config.links.invite
      .replace("$client_id", config.auth.clientId)
      .replace("$redirect_uri", config.auth.redirectUri)
  );
});

export default router;
