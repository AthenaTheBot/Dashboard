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
        redirect(available ? `/dashboard/${id}` : "/invite", true);
      }}
      className="athena-server"
    >
      <img src={icon} alt={name} />
      <h1>{guildName}</h1>
      {available ? (
        ""
      ) : (
        <div className="athena-server-invite">
          <h5>Invite Athena</h5>
        </div>
      )}
    </div>
  );
}

export default Server;
