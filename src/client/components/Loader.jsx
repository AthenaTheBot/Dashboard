import styles from "../styles/Loader.module.scss";

const Loader = ({
  enabled = true,
  message = "Sit tight, we're getting there",
}) => {
  return (
    <div
      className={`${styles.loader} ${!enabled ? styles.loaderDisabled : ""}`}
    >
      <div className={styles.loaderComponent}></div>
      <div className={styles.loaderComponent}></div>
      <div className={styles.loaderComponent}></div>
      <p>{message}</p>
    </div>
  );
};

export default Loader;
