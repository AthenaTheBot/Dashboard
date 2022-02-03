import express from "express";
import getCurrentUser from "../../utils/getUser";
import getCurrentUserGuilds from "../../utils/getUserGuilds";

const router = express.Router();

router.get("/@me", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.status(400).json({ message: "Bad Request" }).end();

  const user = await getCurrentUser(session);

  if (!user) return res.status(500).json({ message: "Server Error" }).end();

  res.status(200).json(user).end();
});

router.get("/@me/guilds", async (req, res) => {
  const session = req.signedCookies?.session;

  if (!session) return res.status(400).json({ message: "Bad Request" }).end();

  const guilds = await getCurrentUserGuilds(session, true);

  if (!guilds || !Array.isArray(guilds))
    return res.status(500).json({ message: "Server Error" }).end();

  return res.status(200).json(guilds).end();
});

export default router;
