import styles from "../styles/NotFound.page.module.scss";

import Seo from "../components/Seo";
import Button from "../components/Button";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Seo title="Not Found - Athena" description="Page not found." />
      <div className={styles.wrapper}>
        <h1>404 ∙ Not Found</h1>
        <p>We can't seem to find the page that you were looking for.</p>
        <Button passive to="/">
          Head to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
