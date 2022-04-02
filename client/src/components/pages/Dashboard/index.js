import { Fragment, useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get as cookieGet } from "js-cookie";
import { FiLayers, FiShield } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { BiCog } from "react-icons/bi";
import $ from "jquery";

import { validCategories } from "./categoryLoader";
import dashContext from "../../../context/dash/dashContext";

import CategoryLoader from "./categoryLoader";

import "./style.css";

import Loader from "../../layout/Loader";

function Dashboard() {
  const {
    guilds,
    setCurrentServer,
    getAvailableLanguages,
    availableLanguages,
  } = useContext(dashContext);
  const { guildId, category } = useParams();
  const navigate = useNavigate();
  const [currentGuild, setCurrentGuild] = useState(null);

  useEffect(() => {
    (async () => {
      if (process.env.NODE_ENV === "production") {
        if (!availableLanguages) return getAvailableLanguages();

        const sessionCookie = cookieGet("session");

        if (!sessionCookie) return window.location.replace("/oauth/login");

        if (currentGuild) return;

        const guild = await fetch(`/api/guilds/${guildId}`)
          .then(async (res) => {
            if (!res.ok) return null;
            return await res.json();
          })
          .then((res) => res.data)
          .catch((err) => null);

        if (!guild) return navigate("/servers");

        setTimeout(() => {
          setCurrentServer(guild);

          setCurrentGuild(guild);
        }, 100);
      } else {
        setCurrentGuild([]);
      }
    })();
    //eslint-disable-next-line
  }, [availableLanguages, guilds, guildId, navigate, getAvailableLanguages]);

  useEffect(() => {
    if (!category || !validCategories.includes(category))
      navigate(`/dashboard/${guildId}/overview`);
    else {
    }
  }, [navigate, category, guildId]);

  const showCategorySelectory = () => {
    $(".dash-module-selector").addClass("module-selectory-enabled");
    $(".athena-dash-fade").css("display", "block");
  };

  const hideCategorySelectory = () => {
    $(".dash-module-selector").removeClass("module-selectory-enabled");
    $(".athena-dash-fade").css("display", "none");
  };

  const selectoryCategoryClicked = (category) => {
    navigate(`/dashboard/${guildId}/${category}`);
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
              <div
                style={{
                  backgroundImage: `url(${
                    currentGuild?.icon
                      ? currentGuild.icon
                      : "/assets/images/default.png"
                  })`,
                }}
                className="module-selector-guild-background"
              ></div>
              <div className="module-selector-guild-inner">
                <img
                  src={
                    currentGuild?.icon
                      ? currentGuild.icon
                      : "/assets/images/default.png"
                  }
                  alt={currentGuild?.name ? currentGuild.name : "Guild Name"}
                />
                <h5>{currentGuild?.name ? currentGuild.name : "Guild Name"}</h5>
              </div>
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
                  selectoryCategoryClicked("settings");
                }}
                className="module-selectory-body-element"
              >
                <BiCog />
                <p>Settings</p>
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
            <CategoryLoader category={category} />
          </div>
        </Fragment>
      ) : (
        <Loader coverAllPage={true} active={true} />
      )}
    </div>
  );
}

export default Dashboard;
