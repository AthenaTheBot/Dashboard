import React from "react";
import Button from "../../../layout/Button";
import $ from "jquery";

import "./style.css";

function ChangesDetected({ loading, active, savedChanges, resetChanges }) {
  const saveChangesBtn = () => {
    if (savedChanges) savedChanges(closeMenu);
  };

  const resetChangesBtn = () => {
    if (resetChanges) resetChanges(closeMenu);
  };

  const closeMenu = () => {
    $(".athena-changes-detected-container").addClass(
      "athena-changes-detected-closing"
    );
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
            {loading ? "Loading.." : "Save Changes"}
          </Button>
        </div>
      </div>
    );
  } else return <React.Fragment />;
}

export default ChangesDetected;
