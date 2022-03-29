import { useEffect } from "react";
import $ from "jquery";

// Styling
import "./style.css";

const Loader = ({ active, coverAllPage, loaderColor, loaderMsg }) => {
  useEffect(() => {
    if (!active) {
      $(".loader").addClass("loader-disabled");
      setTimeout(() => {
        $(".loader").addClass("disabled");
      }, 610);
    } else {
      $(".loader").removeClass("loader-disabled");
    }

    if (coverAllPage) {
      $(".loader").addClass("cover");
    } else {
      $(".loader").removeClass("cover");
    }
  });

  return (
    <div className="loader">
      <div className="loader-inner">
        <div className="spinner">
          <div
            style={{ backgroundColor: loaderColor }}
            className="bounce1"
          ></div>
          <div
            style={{ backgroundColor: loaderColor }}
            className="bounce2"
          ></div>
          <div
            style={{ backgroundColor: loaderColor }}
            className="bounce3"
          ></div>
        </div>
        <p style={{ display: loaderMsg === "__empty" ? "none" : "block" }}>
          {loaderMsg ? loaderMsg : "Sit tight! We are getting there.."}
        </p>
      </div>
    </div>
  );
};

export default Loader;
