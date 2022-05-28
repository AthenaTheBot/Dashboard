import styles from "../styles/Dashboard.page.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Seo from "../components/Seo";
import logo from "../images/logo.png";
import $ from "jquery";
import ServersContext from "../context/Servers/ServersContext";
import { Fragment, useContext, useEffect } from "react";
import { BiCube } from "react-icons/bi";
import { FaCogs } from "react-icons/fa";
import { GiThorHammer } from "react-icons/gi";
import { IoMdMusicalNote } from "react-icons/io";
import { VscMenu } from "react-icons/vsc";
import {
  Overview,
  Settings,
  Moderation,
  Music,
  NotFound,
} from "../components/DashboardPages";

const Dashboard = () => {
  const { id, category } = useParams();
  const { servers, getServers } = useContext(ServersContext);
  const navigate = useNavigate();
  const server = servers?.find((x) => x.id === id);

  useEffect(() => {
    if (!servers) getServers();
  }, [servers, getServers]);

  const guildsMenuClicked = (e) => {
    const otherServers = servers.filter((x) => x.iod !== id);

    if (otherServers.length === 0) return;

    const element = $(e.currentTarget).parent().children(`.${styles.guilds}`);

    if (element.hasClass(styles.guildsMenuEnabled)) {
      element.removeClass(styles.guildsMenuEnabled);
    } else {
      element.addClass(styles.guildsMenuEnabled);
    }
  };

  const toggleMenu = () => {
    const menu = $(`.${styles.menu}`);

    if (menu.hasClass(styles.menuOpened)) {
      menu.removeClass(styles.menuOpened);
    } else {
      menu.addClass(styles.menuOpened);
    }
  };

  useEffect(() => {
    if (!category) navigate(`/dashboard/${id}/overview`);
  }, [category, navigate, id]);

  return (
    <Container className={styles.container} bgColor>
      <Seo title="Dashboard - Athena" />
      <div className={styles.menu}>
        <div className={styles.brand}>
          <img src={logo} alt="Athena" />
        </div>
        <div className={styles.guildSelector}>
          <div className={styles.currentGuild} onClick={guildsMenuClicked}>
            {server?.icon ? (
              <img src={server?.icon} alt="Server Icon" />
            ) : (
              <div className={styles.iconPlaceholder}>
                {server?.name?.slice(0, 1)}
              </div>
            )}
            <p>{server?.name}</p>
          </div>
          <div className={styles.guilds}>
            {servers?.map((server) => {
              if (server?.id === id) return <Fragment></Fragment>;
              return (
                <div
                  onClick={() => {
                    navigate(`/dashboard/${server?.id}`);
                  }}
                  className={styles.guild}
                >
                  {server?.icon ? (
                    <img src={server?.icon} alt="Server Icon" />
                  ) : (
                    <div className={styles.iconPlaceholder}>
                      {server?.name?.slice(0, 1)}
                    </div>
                  )}
                  <p>{server?.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.categories}>
          <div
            onClick={() => {
              navigate(`/dashboard/${id}/overview`);
              toggleMenu();
            }}
            className={styles.category}
          >
            <BiCube />
            <p>Overview</p>
          </div>
          <div
            onClick={() => {
              navigate(`/dashboard/${id}/settings`);
              toggleMenu();
            }}
            className={styles.category}
          >
            <FaCogs />
            <p>Settings</p>
          </div>
          <div
            onClick={() => {
              navigate(`/dashboard/${id}/moderation`);
              toggleMenu();
            }}
            className={styles.category}
          >
            <GiThorHammer />
            <p>Moderation</p>
          </div>
          <div
            onClick={() => {
              navigate(`/dashboard/${id}/music`);
              toggleMenu();
            }}
            className={styles.category}
          >
            <IoMdMusicalNote />
            <p>Music</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <VscMenu className={styles.menuToggle} onClick={toggleMenu} />
        {(() => {
          switch (category) {
            case "overview":
              return <Overview />;

            case "settings":
              return <Settings />;

            case "moderation":
              return <Moderation />;

            case "music":
              return <Music />;

            default:
              return <NotFound />;
          }
        })()}
      </div>
    </Container>
  );
};

export default Dashboard;
