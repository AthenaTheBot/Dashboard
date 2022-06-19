import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Seo from "../components/Seo";

import styles from "../styles/Home.page.module.scss";

import FeatureMusic from "../images/FeatureMusic.svg";
import FeatureModeration from "../images/FeatureModeration.svg";
import FeatureFun from "../images/FeatureFun.svg";
import FeatureMisc from "../images/FeatureMisc.svg";
import Button from "../components/Button";

function Home() {
  return (
    <Container bgGradientColor="var(--primary-theme)">
      <Seo title="Home - Athena" />
      <Navbar />
      <header className={styles.header}>
        <h1>A Discord Bot that can fulfill your server needs for FREE...</h1>
        <p>
          Athena is a multi-functional discord bot that offers many services for
          free such as playing any song you desire or making moderation of your
          server easier.
        </p>
      </header>
      <main className={styles.main}>
        <div className={styles.feature}>
          <div className={styles.featureWrapper}>
            <img src={FeatureMusic} alt="Music" height={400} width={400} />
            <div className={styles.featureContent}>
              <h1>Music</h1>
              <p>
                Athena has a powerful music module which you can listen to music
                from Youtube and Spotify.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureWrapper}>
            <img src={FeatureModeration} alt="Music" height={400} width={400} />
            <div className={styles.featureContent}>
              <h1>Moderation</h1>
              <p>
                With Athena&apos;s big range of moderation commands you can
                moderate your server easily and quickly!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureWrapper}>
            <img src={FeatureFun} alt="Music" height={400} width={400} />
            <div className={styles.featureContent}>
              <h1>Fun</h1>
              <p>
                Do you like fun commands such as trash, triggered? Because we do
                and we put some fun commands to Athena that you may love such as
                mimic command!
              </p>
            </div>
          </div>
        </div>

        <div className={styles.feature}>
          <div className={styles.featureWrapper}>
            <img src={FeatureMisc} alt="Music" height={400} width={400} />
            <div className={styles.featureContent}>
              <h1>Misc</h1>
              <p>
                Other commands that we couldn&apos;t put in a section such as
                fortnite stats or weather forecast.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <h1>Ready To Try Athena?</h1>
        <Button className={styles.btn} to="/redirects/invite">
          Invite Athena!
        </Button>
      </footer>
      <Footer />
    </Container>
  );
}

export default Home;
