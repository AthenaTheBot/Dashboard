import styles from "../styles/Dashboard.page.module.scss";

import Container from "../components/Container";
import Seo from "../components/Seo";
import Button from "../components/Button";

const Dashboard = () => {
  return (
    <Container className={styles.container} bgColor bgGradientColor="">
      <Seo title="Dashboard - Athena" />
      <div className={styles.wrapper}>
        <h1>Coming Soon!</h1>
        <p>We are recreating our dashboard. We will come back soon!</p>
        <Button passive to="/">
          Head to home
        </Button>
      </div>
    </Container>
  );
};

export default Dashboard;
