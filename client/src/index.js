import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DashState from "./context/dash/dashState";

ReactDOM.render(
  <DashState>
    <App />
  </DashState>,
  document.getElementById("root")
);
