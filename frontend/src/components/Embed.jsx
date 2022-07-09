import { Fragment, useEffect } from "react";

import ReactMarkdown from "react-markdown";
import Validator from "validator";

import styles from "../styles/Embed.module.scss";

import $ from "jquery";

const Embed = ({ embed }) => {
  const checkImage = (className) => {
    if ($(`.${className}`).length === 0) return;

    $(`.${className}`)
      .on("load", function () {
        $(`.${className}`).removeAttr("style");
      })
      .on("error", function () {
        $(`.${className}`).css("display", "none");
      });
  };

  useEffect(() => {
    checkImage(styles.authorIcon);
    checkImage(styles.thumbnail);
    checkImage(styles.image);
    checkImage(styles.footerIcon);
  });

  useEffect(() => {
    let childCount = 0;

    $(`.${styles.container}`)
      .children()
      .each((c) => {
        const display = $(`.${styles.container} *:nth-child(${c})`).css(
          "display"
        );
        if (display !== "none") childCount++;
      });

    $(`.${styles.thumbnail}`).css("grid-row", `1 / ${childCount}`);
  });

  return (
    <div
      style={{ "--embed-color": embed?.color || "#202225" }}
      className={styles.container}
    >
      <div className={styles.author}>
        {embed?.author?.iconURL && Validator.isURL(embed?.author?.iconURL) ? (
          <img
            className={styles.authorIcon}
            src={embed?.author?.iconURL}
            alt=""
          />
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
      {embed?.thumbnail && Validator.isURL(embed?.thumbnail) ? (
        <img className={styles.thumbnail} src={embed?.thumbnail} alt="" />
      ) : (
        <Fragment />
      )}
      {embed?.image && Validator.isURL(embed?.image) ? (
        <img className={styles.image} src={embed?.image} alt="" />
      ) : (
        <Fragment />
      )}
      <div className={styles.footer}>
        {embed?.footer?.iconURL &&
        Validator.isURL(embed?.footer?.iconURL) &&
        embed?.footer?.text ? (
          <img
            className={styles.footerIcon}
            src={embed?.footer?.iconURL}
            alt=""
          />
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
