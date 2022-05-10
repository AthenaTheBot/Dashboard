import express from "express";
import authController from "../../middlewares/authController";
import getCurrentUser from "../../utils/getUser";
import getCurrentUserGuilds from "../../utils/getUserGuilds";

const router = express.Router();

router.use(authController);

router.get("/@me", async (req, res) => {
  const session = req.signedCookies?.session;

  const user = await getCurrentUser(session);

  if (!user) return res.serverError();

  res.successfull({
    ...user,
    avatar: user?.avatar
      ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
      : null,
  });
});

router.get("/@me/guilds", async (req, res) => {
  const session = req.signedCookies?.session;

  const guilds = await getCurrentUserGuilds(session, true);

  if (!guilds || !Array.isArray(guilds)) return res.serverError();

  return res.successfull(guilds);
});

export default router;
