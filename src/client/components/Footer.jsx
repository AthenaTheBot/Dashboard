import styles from "../styles/Footer.module.scss";
import Link from "./Link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="Athena" height={128} width={128} />
          <p>
            Athena is a multi-functional discord bot that offers many services
            for free such as playing any song you desire or making moderation of
            your server easier.
          </p>
        </div>
        <div className={styles.links}>
          <ul>
            <h2>General</h2>
            <li>
              <Link passive to="/">
                Home
              </Link>
            </li>
            <li>
              <Link passive to="/commands">
                Commands
              </Link>
            </li>
            <li>
              <Link to="/source-code">Source Code</Link>
            </li>
          </ul>

          <ul>
            <h2>Legal</h2>
            <li>
              <Link passive to="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link passive to="/terms">
                Terms Of Service
              </Link>
            </li>
            <li>
              <Link to="/support">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
