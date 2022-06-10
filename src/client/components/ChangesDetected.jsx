import { Fragment } from "react";
import styles from "../styles/ChangesDetected.module.scss";
import Button from "./Button";

const ChangesDetected = ({
  active,
  loading,
  resetChanges = () => {},
  saveChanges = () => {},
}) => {
  return (
    <div className={`${styles.container} ${!active ? styles.disabled : ""}`}>
      <p>Careful! You have unsaved changes</p>
      <div className={styles.buttons}>
        {loading ? <Fragment /> : <Button onClick={resetChanges}>Reset</Button>}
        <Button onClick={saveChanges}>{loading ? "Loading..." : "Save"}</Button>
      </div>
    </div>
  );
};

export default ChangesDetected;
