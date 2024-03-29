import { Helmet, HelmetProvider } from "react-helmet-async";

const Seo = ({
  keywords = [
    "discord",
    "bot",
    "athena",
    "multi-functional",
    "fun",
    "moderation",
    "athenabot",
    "athena-bot",
    "discord-bot",
    "discordbot",
  ],
  description = "Athena is a multi-functional discord bot that offers many services for free such as playing any song you desire or making moderation of your server easier.",
  title = "Athena - The Discord Bot",
  path = "/",
}) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#23215a" />
        <meta name="keywords" content={keywords.join(",")} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`https://athena.bot${path}`} />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:image:width" content="64" />
        <meta property="og:image:height" content="64" />
        <title>{title}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default Seo;
