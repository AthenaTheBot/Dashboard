import { Fragment, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get as cookieGet } from "js-cookie";
import { FiLayers, FiShield } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BiCog } from "react-icons/bi";
import $ from "jquery";

import dashContext from "../../../context/dash/dashContext";

import CategoryLoader from "./categoryLoader";

import "./style.css";

import Loader from "../../layout/Loader";

function Dashboard() {
  const { guilds, setCurrentServer } = useContext(dashContext);
  const { guildId } = useParams();
  const navigate = useNavigate();
  const [currentGuild, setCurrentGuild] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("overview");

  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === "production") {
        const sessionCookie = cookieGet("session");

        if (!sessionCookie) return navigate("/oauth/login");

        const guild = await fetch(`/api/guilds/${guildId}`)
          .then(async (res) => {
            if (!res.ok) return null;
            return await res.json();
          })
          .catch((err) => null);

        if (!guild) return navigate("/servers");

        setCurrentServer(guild);

        guild.displayName =
          guild.name.length >= 12
            ? (guild.displayName = guild.name.slice(0, 12) + "..")
            : guild.name;

        setCurrentGuild(guild);
      }
    })();
    //eslint-disable-next-line
  }, [guilds, guildId, navigate]);

  const showCategorySelectory = () => {
    $(".dash-module-selector").addClass("module-selectory-enabled");
    $(".athena-dash-fade").css("display", "block");
  };

  const hideCategorySelectory = () => {
    $(".dash-module-selector").removeClass("module-selectory-enabled");
    $(".athena-dash-fade").css("display", "none");
  };

  const selectoryCategoryClicked = (category) => {
    setCurrentCategory(category);
    hideCategorySelectory();
  };

  useEffect(() => {
    $(".dash-module-title h1")
      .off("click")
      .on("click", (e) => {
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
  });

  return (
    <div className="athena-dash-container">
      <div className="athena-dash-fade"></div>
      {currentGuild ? (
        <Fragment>
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
              <li
                onClick={() => {
                  selectoryCategoryClicked("overview");
                }}
                className="module-selectory-body-element"
              >
                <FiLayers />
                <p>Overview</p>
              </li>
              <li
                onClick={() => {
                  selectoryCategoryClicked("configuration");
                }}
                className="module-selectory-body-element"
              >
                <BiCog />
                <p>Configuration</p>
              </li>
              <li
                onClick={() => {
                  selectoryCategoryClicked("moderation");
                }}
                className="module-selectory-body-element"
              >
                <FiShield />
                <p>Moderation</p>
              </li>
              <li
                onClick={() => {
                  selectoryCategoryClicked("music");
                }}
                className="module-selectory-body-element"
              >
                <IoMusicalNotesOutline />
                <p>Music</p>
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
