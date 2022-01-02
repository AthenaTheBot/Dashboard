import { useContext } from "react";
import dashContext from "../../../../../context/dash/dashContext";

import "./style.css";

function Overview() {
  const { currentServer: server } = useContext(dashContext);

  return (
    <div className="module-overview-container">
      <div className="dash-module-prop">
        <h5 className="dash-module-prop-name">Text Channels</h5>
        <h5 className="dash-module-prop-value">
          {server?.channels?.text ? server.channels.text : 0}
        </h5>
      </div>
      <div className="dash-module-prop">
        <h5 className="dash-module-prop-name">Voice Channels</h5>
        <h5 className="dash-module-prop-value">
          {server?.channels?.voice ? server.channels.voice : 0}
        </h5>
      </div>
      <div className="dash-module-prop">
        <h5 className="dash-module-prop-name">Members</h5>
        <h5 className="dash-module-prop-value">
          {server?.members ? server.members : 0}
        </h5>
      </div>
      <div className="dash-module-prop">
        <h5 className="dash-module-prop-name">Roles</h5>
        <h5 className="dash-module-prop-value">
          {server?.roles ? server.roles : 0}
        </h5>
      </div>
      <div className="dash-module-prop">
        <h5 className="dash-module-prop-name">Created At</h5>
        <h5 className="dash-module-prop-value">
          {server?.createdAt ? server.createdAt : "Unknown"}
        </h5>
      </div>
    </div>
  );
}

export default Overview;
