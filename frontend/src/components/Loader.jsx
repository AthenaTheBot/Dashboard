import styles from "../styles/Loader.module.scss";

const Loader = ({
  style = null,
  spinnerStyle = null,
  enabled = true,
  coverAllPage,
  onlySpinner,
  message = "Sit tight, we're getting there",
}) => {
  if (onlySpinner) {
    return (
      <div
        style={style}
        className={`${styles.loader} ${!enabled ? styles.loaderDisabled : ""} ${
          coverAllPage ? styles.coverAllPage : ""
        }`}
      >
        <div style={spinnerStyle} className={styles.loaderComponent}></div>
        <div style={spinnerStyle} className={styles.loaderComponent}></div>
        <div style={spinnerStyle} className={styles.loaderComponent}></div>
      </div>
    );
  } else {
    return (
      <div
        style={style}
        className={`${styles.loader} ${!enabled ? styles.loaderDisabled : ""} ${
          coverAllPage ? styles.coverAllPage : ""
        }`}
      >
        <div>
          <div style={spinnerStyle} className={styles.loaderComponent}></div>
          <div style={spinnerStyle} className={styles.loaderComponent}></div>
          <div style={spinnerStyle} className={styles.loaderComponent}></div>
        </div>
        <p>{message}</p>
      </div>
    );
  }
};

export default Loader;
