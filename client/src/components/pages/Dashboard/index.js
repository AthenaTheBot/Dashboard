import { Fragment, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get as cookieGet } from "js-cookie";

import dashContext from "../../../context/dash/dashContext";

import "./style.css";

import Profile from "../../layout/Navbar/Profile";
import Loader from "../../layout/Loader";

function Dashboard() {
  const { guilds, getUserGuilds } = useContext(dashContext);
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [currentGuild, setCurrentGuild] = useState([]);

  useEffect(() => {
    (async () => {
      const sessionCookie = cookieGet("session");
      if (!sessionCookie) return navigate("/oauth/login");
      const guild = await fetch(`/api/guilds/${guildId}`)
        .then(async (res) => {
          if (!res.ok) return null;
          return await res.json();
        })
        .catch((err) => null);

      if (!guild) return navigate("/servers");

      guild.displayName =
        guild.name.length >= 12
          ? (guild.displayName = guild.name.slice(0, 12) + "..")
          : guild.name;

      setCurrentGuild(guild);
    })();
  }, [guilds, guildId, getUserGuilds, navigate]);

  return (
    <div className="athena-dash-container">
      {currentGuild ? (
        <Fragment>
          <Profile
            drodpownOptions={[
              {
                label: "Servers",
                link: "/servers",
                passive: true,
              },
              {
                label: "Logout",
                link: "/oauth/logout",
                passive: false,
                color: "var( --primary-error)",
              },
            ]}
          />
          <div className="dash-module-selector">
            <div className="module-selector-guild">
              <img
                src={
                  currentGuild?.icon
                    ? currentGuild.icon
                    : "/assets/images/default.png"
                }
                alt={
                  currentGuild?.displayName
                    ? currentGuild.displayName
                    : "Guild Name"
                }
              />
              <h5>
                {currentGuild?.displayName
                  ? currentGuild.displayName
                  : "Guild Name"}
              </h5>
            </div>
            <ul className="module-selector-body">
              <li>Overview</li>
              <li>Moderation</li>
              <li>Music</li>
            </ul>
          </div>
          <div className="dash-module-container"></div>
        </Fragment>
      ) : (
        <Loader coverAllPage={true} active={true} />
      )}
    </div>
  );
}

export default Dashboard;
