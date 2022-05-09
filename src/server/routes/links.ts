import express from "express";
import { config } from "../index";

const router = express.Router();

const links = Object.getOwnPropertyNames(config?.links || {}) || [];

for (let i = 0; i < links.length; i++) {
  const url = (config.links as any)[links[i] as any];
  if (url) {
    router.get(`/${links[i]}`, (req, res) => {
      const formattedUrl = url
        .replace("$client_id", config.auth.clientId)
        .replace("$redirect_uri", config.auth.redirectUri);

      res.redirect(formattedUrl);
    });
  }
}

export default router;
