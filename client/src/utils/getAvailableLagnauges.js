const getAvailableLanguages = async () => {
  const languages = await fetch(`/api/getAvailableLanguages`)
    .then((res) => res.json())
    .then((d) => d.data)
    .catch((err) => null);

  return languages;
};

export default getAvailableLanguages;
