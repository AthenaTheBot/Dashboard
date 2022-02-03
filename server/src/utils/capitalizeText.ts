const capitalizeText = (text: string) => {
  const firstLetter = text.slice(0, 1).toUpperCase();
  const restText = text.slice(1, text.length);
  return firstLetter + restText;
};

export default capitalizeText;
