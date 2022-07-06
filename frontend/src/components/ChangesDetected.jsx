import { Fragment, useState } from "react";
import styles from "../styles/ChangesDetected.module.scss";
import Button from "./Button";
import Loader from "./Loader";

const ChangesDetected = ({ active, loading, resetChanges, saveChanges }) => {
  const [collapsing, setCollapsing] = useState(false);

  const showUi = async () => {
    setCollapsing(false);

    return new Promise((resolve) => {
      setTimeout(resolve, 710);
    });
  };
  const hideUi = () => {
    setCollapsing(true);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setCollapsing(false);
      }, 710);
    });
  };
  const toggleUi = () => {
    if (active) return hideUi();
    else return showUi();
  };

  const onSaveChangesRequest = () => {
    if (saveChanges && typeof saveChanges === "function") saveChanges(toggleUi);
  };

  const onResetChangesRequest = () => {
    if (resetChanges && typeof resetChanges === "function")
      resetChanges(toggleUi);
  };

  return (
    <div
      className={`${styles.container}${!active ? " " + styles.disabled : ""}${
        collapsing ? " " + styles.collapsing : ""
      }`}
    >
      <p>Careful! You have unsaved changes</p>
      <div className={styles.buttons}>
        {loading ? (
          <Fragment />
        ) : (
          <Button onClick={onResetChangesRequest}>Reset</Button>
        )}
        <Button
          style={{
            maxHeight: "44px",
            maxWidth: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={onSaveChangesRequest}
        >
          {loading ? (
            <Loader
              onlySpinner
              style={{
                display: "flex",
                margin: "0px",
              }}
              spinnerStyle={{
                backgroundColor: "white",
                height: "8px",
                width: "8px",
              }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChangesDetected;
