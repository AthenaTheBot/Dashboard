import express from "express";
import getCurrentUser from "../../utils/getUser";
import getCurrentUserGuilds from "../../utils/getUserGuilds";

const router = express.Router();

router.get("/@me", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.badRequest();

  const user = await getCurrentUser(session);

  if (!user) return res.serverError();

  res.successfull({ data: user });
});

router.get("/@me/guilds", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.badRequest();

  const guilds = await getCurrentUserGuilds(session, true);

  if (!guilds || !Array.isArray(guilds)) return res.serverError();

  return res.successfull({ data: guilds });
});

export default router;
