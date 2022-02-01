import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./style.css";

function Server({ id, available, name, icon }) {
  const navigate = useNavigate();
  const redirect = (to, passive = true) => {
    if (passive) {
      navigate(to);
    } else {
      window.location.replace(to);
    }
  };
  const [guildName, setGuildName] = useState("Loading..");

  useEffect(() => {
    let parsedName = name.length >= 13 ? name.slice(0, 11) + ".." : name;
    setGuildName(parsedName);
  }, [name]);

  return (
    <div
      onClick={() => {
        if (available) {
          redirect(`/dashboard/${id}`, true);
        } else {
          window.location.replace("/invite");
        }
      }}
      className="athena-server"
    >
      <img src={icon} alt={name} />
      <h1>{guildName}</h1>
      <div className="athena-server-invite">
        <h5>{available ? "Go To Dashboard" : "Invite Athena"} </h5>
      </div>
    </div>
  );
}

export default Server;
