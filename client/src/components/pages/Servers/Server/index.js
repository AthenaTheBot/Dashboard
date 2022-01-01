import { useNavigate } from "react-router-dom";

import "./style.css";

function Server({ id, name, icon }) {
  const navigate = useNavigate();
  const redirect = (to, passive = true) => {
    if (passive) {
      navigate(to);
    } else {
      window.location.replace(to);
    }
  };

  return (
    <div
      onClick={() => {
        redirect(`/dashboard/${id}`, true);
      }}
      className="athena-server"
    >
      <img src={icon} alt={name} />
      <h1>{name}</h1>
    </div>
  );
}

export default Server;
