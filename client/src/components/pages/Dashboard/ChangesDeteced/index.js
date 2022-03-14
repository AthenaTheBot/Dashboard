import { Fragment } from "react";
import Button from "../../../layout/Button";
import Loader from "../../../layout/Loader";
import $ from "jquery";

import "./style.css";

function ChangesDetected({ loading, active, savedChanges, resetChanges }) {
  const saveChangesBtn = () => {
    if (savedChanges) savedChanges(closeMenu);
  };

  const resetChangesBtn = () => {
    if (resetChanges) resetChanges(closeMenu);
  };

  const closeMenuUi = () => {
    $(".athena-changes-detected-container").addClass(
      "athena-changes-detected-closing"
    );

    setTimeout(() => {
      $(".athena-changes-detected-container p").text(
        "Changes, detected! Save changes or reset"
      );

      $(".athena-changes-detected-container").removeAttr("style");
    }, 700);
  };

  const closeMenu = (successfull, delay = 0) => {
    if (!successfull) {
      $(".athena-changes-detected-container p").text(
        "An error has occured! Try again"
      );

      $(".athena-changes-detected-container").css(
        "background-color",
        "var(--primary-error)"
      );
    }

    setTimeout(() => closeMenuUi(), delay);
  };

  if (active) {
    return (
      <div className="athena-changes-detected-container">
        <p>Changes, detected! Save changes or reset</p>
        <div className="athena-changes-detected-buttons">
          <Button id="reset-btn" buttonClicked={resetChangesBtn}>
            Reset Changes
          </Button>
          <Button buttonClicked={saveChangesBtn}>
            {loading ? (
              <Loader active={true} loaderColor="white" loaderMsg="__empty" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    );
  } else return <Fragment />;
}

export default ChangesDetected;
