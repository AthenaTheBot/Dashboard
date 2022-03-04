import { useNavigate } from "react-router-dom";
import Button from "../../../layout/Button";

import "./style.css";

function Server({ id, available, name, icon }) {
  const navigate = useNavigate();
  const redirect = () => {
    if (available) {
      navigate(`/dashboard/${id}`);
    } else {
      window.location.replace(`/invite`);
    }
  };

  return (
    <div className="athena-server" onClick={redirect}>
      <div className="server-top">
        <div
          style={{
            backgroundImage: `url(${
              icon ? icon : "/assets/images/default.png"
            })`,
          }}
          className="server-bg"
        ></div>
        <div className="server-icon">
          <img src={icon ? icon : "/assets/images/default.png"} alt="" />
        </div>
      </div>
      <div className="server-bottom">
        <h3>{name}asdsadsadsad</h3>
        <Button buttonClicked={redirect}>
          {available ? "Go To Dashboard" : "Invite Athena"}
        </Button>
      </div>
    </div>
  );
}

export default Server;
