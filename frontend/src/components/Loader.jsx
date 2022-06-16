import styles from "../styles/Loader.module.scss";

const Loader = ({
  style = null,
  enabled = true,
  coverAllPage,
  message = "Sit tight, we're getting there",
}) => {
  return (
    <div
      style={style}
      className={`${styles.loader} ${!enabled ? styles.loaderDisabled : ""} ${
        coverAllPage ? styles.coverAllPage : ""
      }`}
    >
      <div>
        <div className={styles.loaderComponent}></div>
        <div className={styles.loaderComponent}></div>
        <div className={styles.loaderComponent}></div>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
