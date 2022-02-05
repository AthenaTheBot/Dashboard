import React from "react";
import Button from "../../../layout/Button";
import $ from "jquery";

import "./style.css";

function ChangesDetected({ loading, active, savedChanges }) {
  const saveChanges = () => {
    if (savedChanges) savedChanges(closeMenu);
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
        <Button buttonClicked={saveChanges}>
          {loading ? "Loading.." : "Save Changes"}
        </Button>
      </div>
    );
  } else return <React.Fragment />;
}

export default ChangesDetected;
