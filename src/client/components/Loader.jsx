import styles from "../styles/Loader.module.scss";

const Loader = ({
  enabled = true,
  coverAllPage,
  message = "Sit tight, we're getting there",
}) => {
  return (
    <div
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
