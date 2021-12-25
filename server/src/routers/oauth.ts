import express from "express";
import axios from "axios";
import config from "../../config.json";
import { AccessTokenResponse } from "../constants";

// Router instance
const router = express.Router();

// Helper functions
const exchangeToken = async (
  token: string
): Promise<AccessTokenResponse | null> => {
  try {
    const serverRes = await axios({
      url: config.oauthEndpoints.tokenExchange,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: `grant_type=authorization_code&client_id=${config.auth.clientId}&client_id=${config.auth.clientId}&client_secret=${config.auth.clientSecret}&redirect_uri=${config.auth.redirectUri}&code=${token}`,
    });

    return serverRes.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// Routes
router.get("/login", (req, res) => {
  const parsedLink = config.links.login
    .replace("$client_id", config.auth.clientId)
    .replace("$redirect_uri", config.auth.redirectUri);
  res.redirect(parsedLink);
});

router.get("/logout", (req, res) => {
  res.clearCookie("session");
  res.redirect("/");
});

router.get("/callback", async (req, res) => {
  if (!req.query.code) return res.redirect("/error");

  const auth = await exchangeToken(req.query.code.toString());

  if (!auth?.access_token || !auth?.expires_in) return res.redirect("/error");

  res.cookie("session", auth.access_token, {
    maxAge: auth.expires_in * 1000 - 1000 * 60 * 60 * 2,
    signed: true,
  });

  res.redirect("/");
});

export default router;
