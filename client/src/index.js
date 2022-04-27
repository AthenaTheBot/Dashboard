import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DashState from "./context/dash/dashState";

// Stylesheets
import "react-lazy-load-image-component/src/effects/opacity.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.render(
  <DashState>
    <App />
  </DashState>,
  document.getElementById("__athena")
);
