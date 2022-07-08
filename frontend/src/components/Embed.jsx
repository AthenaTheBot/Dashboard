import { Fragment } from "react";

import ReactMarkdown from "react-markdown";

import styles from "../styles/Embed.module.scss";

const Embed = ({ embed }) => {
  // TODO: Check if image url is valid or not. (npmjs/validator)
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
      <div className={styles.description}>
        <ReactMarkdown>{embed?.description}</ReactMarkdown>
      </div>
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
        {embed?.footer?.name ? (
          <div className={styles.footerName}>
            <ReactMarkdown>{embed?.footer?.name}</ReactMarkdown>
          </div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};

export default Embed;
