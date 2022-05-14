import Container from "../components/Container";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import styles from "../styles/Legal.module.scss";

const Terms = () => {
  return (
    <Container bgGradientColor="var(--third-theme)">
      <Navbar />
      <div className={styles.header}>
        <h1>Terms of Service</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          <p>We are preparing our terms of service..</p>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Terms;
