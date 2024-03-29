import styles from "../styles/Server.module.scss";
import Link from "./Link";
import { LazyLoadImage as LazyImage } from "react-lazy-load-image-component";

const Server = ({ id, name, icon, available }) => {
  const background = {
    backgroundImage: `url(${icon})`,
  };

  return (
    <div className={styles.container}>
      <div style={background} className={styles.background}></div>
      <div className={styles.top}>
        {icon ? (
          <LazyImage effect="opacity" src={icon} alt="Server Icon" />
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
          to={available ? `/dashboard/${id}` : `/redirects/invite?server=${id}`}
          className={styles.btn}
        >
          {available ? "Manage Server" : "Invite Athena"}
        </Link>
      </div>
    </div>
  );
};

export default Server;
