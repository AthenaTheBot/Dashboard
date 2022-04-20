import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import DashState from "./context/dash/dashState";

import MaintenanceWarn from "./components/layout/MaintenanceWarn";

ReactDOM.render(
  <DashState>
    <MaintenanceWarn />
    <App />
  </DashState>,
  document.getElementById("__athena")
);
