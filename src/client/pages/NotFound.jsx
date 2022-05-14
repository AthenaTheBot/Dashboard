import styles from "../styles/NotFound.page.module.scss";

import Seo from "../components/Seo";
import Link from "../components/Link";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Seo
        title="Not Found - Athena"
        keywords={[
          "commands",
          "athena",
          "athenabot",
          "discord-bot-commands",
          "discordbot",
        ]}
        description="Page not found."
      />
      <div className={styles.wrapper}>
        <h1>404</h1>
        <p>We can't seem to find the page that you were looking for.</p>
        <Link className={styles.goHomeBtn} passive noIcon noNewPage to="/">
          Go back to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
