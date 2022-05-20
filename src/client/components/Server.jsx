import styles from "../styles/Server.module.scss";
import Link from "./Link";

const Server = ({ id, name, icon }) => {
  const background = {
    backgroundImage: `url(${icon})`,
  };

  return (
    <div className={styles.container}>
      <div style={background} className={styles.background}></div>
      <div className={styles.top}>
        {icon ? (
          <img src={icon} alt="Server Icon" />
        ) : (
          <div className={styles.iconPlaceholder}>
            {name?.trim()?.slice(0, 1)}
          </div>
        )}
      </div>
      <div className={styles.bottom}>
        <div className={styles.details}>
          <h1>{name.trim()}</h1>
        </div>
        <Link
          passive
          noIcon
          noNewPage
          to={`/dashboard/${id}`}
          className={styles.btn}
        >
          Manage Server
        </Link>
      </div>
    </div>
  );
};

export default Server;
