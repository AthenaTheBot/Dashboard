import Cookie from "js-cookie";

const getAvailableRoles = async (guildId) => {
  const session = Cookie.get("session");

  if (!session) return;

  const roles = await fetch(`/api/guilds/${guildId}/getAvailableRoles`)
    .then((res) => res.json())
    .then((d) => d.data)
    .catch((err) => null);

  return roles;
};

export default getAvailableRoles;
