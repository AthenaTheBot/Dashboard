const SaveChnages = async (guildId, module, data) => {
  return await fetch(`/api/guilds/${guildId}/${module}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => (res.status === 200 ? true : false))
    .catch((err) => false);
};

export default SaveChnages;
