import { Fragment, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get as cookieGet } from "js-cookie";
import { FiLayers, FiShield } from "react-icons/fi";
import { BsArrowBarRight } from "react-icons/bs";
import { IoMusicalNotesOutline } from "react-icons/io5";
import $ from "jquery";

import dashContext from "../../../context/dash/dashContext";

import CategoryLoader from "./categoryLoader";

import "./style.css";

import Profile from "../../layout/Navbar/Profile";
import Loader from "../../layout/Loader";

function Dashboard() {
  const { guilds, getUserGuilds } = useContext(dashContext);
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [currentGuild, setCurrentGuild] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("overview");

  useEffect(() => {
    (async () => {
      // const sessionCookie = cookieGet("session");
      // if (!sessionCookie) return navigate("/oauth/login");
      // const guild = await fetch(`/api/guilds/${guildId}`)
      //   .then(async (res) => {
      //     if (!res.ok) return null;
      //     return await res.json();
      //   })
      //   .catch((err) => null);
      // if (!guild) return navigate("/servers");
      // guild.displayName =
      //   guild.name.length >= 12
      //     ? (guild.displayName = guild.name.slice(0, 12) + "..")
      //     : guild.name;
      // setCurrentGuild(guild);
    })();
  }, [guilds, guildId, getUserGuilds, navigate]);

  const showCategorySelectory = () => {
    $(".dash-module-selector").addClass("module-selectory-enabled");
    $(".athena-dash-fade").css("display", "block");
  };

  const hideCategorySelectory = () => {
    $(".dash-module-selector").removeClass("module-selectory-enabled");
    $(".athena-dash-fade").css("display", "none");
  };

  useEffect(() => {
    $(".dash-module-title")
      .off("click")
      .on("click", (e) => {
        console.log("SJ");
        const selectorEnabled = $(".dash-module-selector").hasClass(
          "module-selectory-enabled"
        );

        if (selectorEnabled) hideCategorySelectory();
        else showCategorySelectory();
      });

    $(".athena-dash-fade")
      .off("click")
      .on("click", (e) => {
        hideCategorySelectory();
      });
  }, []);

  return (
    <div className="athena-dash-container">
      <div className="athena-dash-fade"></div>
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
              <p className="module-selectory-body-title">CATEGORIES</p>
              <li className="module-selectory-body-element">
                <FiLayers />
                <p
                  onClick={() => {
                    setCurrentCategory("overview");
                  }}
                >
                  Overview
                </p>
              </li>
              <li className="module-selectory-body-element">
                <FiShield />
                <p
                  onClick={() => {
                    setCurrentCategory("moderation");
                  }}
                >
                  Moderation
                </p>
              </li>
              <li className="module-selectory-body-element">
                <IoMusicalNotesOutline />
                <p
                  onClick={() => {
                    setCurrentCategory("music");
                  }}
                >
                  Music
                </p>
              </li>
            </ul>
          </div>
          <div className="dash-module-container">
            <CategoryLoader category={currentCategory} />
          </div>
        </Fragment>
      ) : (
        <Loader coverAllPage={true} active={true} />
      )}
    </div>
  );
}

export default Dashboard;
