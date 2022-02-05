import Cookie from "js-cookie";

const updateGuildSettings = async (guild, category, payload) => {
  const session = Cookie.get("session");

  if (!session) return;

  await fetch(`/api/guilds/${guild}/${category}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).catch((err) => false);

  return;
};

export default updateGuildSettings;
