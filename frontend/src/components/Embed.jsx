import { Fragment } from "react";
import styles from "../styles/Embed.module.scss";

const Embed = ({ embed }) => {
  // TODO: Markdown formatting
  return (
    <div
      style={{ "--embed-color": embed?.color || "#202225" }}
      className={styles.container}
    >
      <div className={styles.author}>
        {embed?.author?.icon ? (
          <img src={embed?.author?.icon} alt="" />
        ) : (
          <Fragment />
        )}
        {embed?.author?.name ? (
          <div className={styles.authorName}>{embed?.author?.name}</div>
        ) : (
          <Fragment />
        )}
      </div>
      <h3 className={styles.title}>{embed?.title}</h3>
      <div className={styles.description}>{embed?.description}</div>
      {embed?.thumbnail ? (
        <img className={styles.thumbnail} src={embed?.thumbnail} alt="" />
      ) : (
        <Fragment />
      )}
      {embed?.image ? (
        <img className={styles.image} src={embed?.image} alt="" />
      ) : (
        <Fragment />
      )}
      <div className={styles.footer}>
        {embed?.footer?.icon ? (
          <img src={embed?.footer?.icon} alt="" />
        ) : (
          <Fragment />
        )}
        <div className={styles.footerName}>{embed?.footer?.name}</div>
      </div>
    </div>
  );
};

export default Embed;
