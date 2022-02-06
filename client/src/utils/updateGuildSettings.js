import Cookie from "js-cookie";

const updateGuildSettings = async (guild, category, payload) => {
  const session = Cookie.get("session");

  if (!session) return;

  const success = await fetch(`/api/guilds/${guild}/${category}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => (res.status == 200 ? true : false))
    .catch((err) => false);

  return success;
};

export default updateGuildSettings;
