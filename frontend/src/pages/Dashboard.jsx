import styles from "../styles/Dashboard.page.module.scss";

import { useParams, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import Seo from "../components/Seo";
import Loader from "../components/Loader";
import logo from "../images/logo.png";
import $ from "jquery";
import ServersContext from "../context/Servers/ServersContext";
import { Fragment, useContext, useEffect, useState } from "react";
import { BiCube } from "react-icons/bi";
import { FaCogs } from "react-icons/fa";
import { GiThorHammer } from "react-icons/gi";
import { IoMdMusicalNote } from "react-icons/io";
import { VscMenu } from "react-icons/vsc";
import { BsJournalText } from "react-icons/bs";
import {
  Overview,
  Settings,
  Moderation,
  Music,
  NotFound,
  Logging,
} from "../components/DashboardPages";
import UtilsContext from "../context/Utils/UtilsContext";
import Link from "../components/Link";

const Dashboard = () => {
  const { id, category } = useParams();
  const { servers } = useContext(ServersContext);
  const { availableLanguages } = useContext(UtilsContext);
  const navigate = useNavigate();
  const server = servers?.find((x) => x.id === id && x?.available);
  const [serverDetails, setServerDetails] = useState(null);

  useEffect(() => {
    if (!category) navigate(`/dashboard/${id}/overview`);
  }, [category, navigate, id]);

  useEffect(() => {
    (async () => {
      const data = await fetch(`/api/guilds/${id}`)
        .then((res) => {
          if (res.status === 200) return res.json();
          else return null;
        })
        .catch((err) => null);

      if (data) {
        setServerDetails(data);
      }
    })();

    //eslint-disable-next-line
  }, [id]);

  const toggleGuildsMenu = (e) => {
    const otherServers = servers.filter((x) => x.iod !== id);

    if (otherServers.length === 0) return;

    const element = $(`.${styles.guilds}`)
      .parent()
      .children(`.${styles.guilds}`);

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

  return (
    <Container className={styles.container} bgColor>
      <Seo title="Dashboard - Athena" />
      <Loader
        enabled={
          (server && serverDetails && availableLanguages) ||
          process.env.NODE_ENV === "development"
            ? false
            : true
        }
        coverAllPage
      />
      <div className={styles.menu}>
        <div className={styles.brand}>
          <img src={logo} alt="Athena" />
        </div>
        <div className={styles.guildSelector}>
          <div className={styles.currentGuild} onClick={toggleGuildsMenu}>
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
            {servers?.map((server, serverIndex) => {
              if (server?.id === id) return <Fragment key={serverIndex} />;
              return (
                <Link
                  noIcon
                  to={
                    server?.available
                      ? `/dashboard/${server?.id}`
                      : `/redirects/invite?server=${server.id}`
                  }
                  noNewPage={server?.available}
                  passive={server?.available}
                  key={serverIndex}
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
                </Link>
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
              navigate(`/dashboard/${id}/logging`);
              toggleMenu();
            }}
            className={styles.category}
          >
            <BsJournalText />
            <p>Logging</p>
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
              return <Overview serverData={{ ...server, ...serverDetails }} />;

            case "settings":
              return (
                <Settings
                  serverData={{
                    ...server,
                    ...serverDetails,
                    availableLanguages,
                    setServerDetails,
                  }}
                />
              );

            case "moderation":
              return (
                <Moderation serverData={{ ...server, ...serverDetails }} />
              );

            case "logging":
              return <Logging serverData={{ ...server, ...serverDetails }} />;

            case "music":
              return <Music serverData={{ ...server, ...serverDetails }} />;

            default:
              return <NotFound />;
          }
        })()}
      </div>
    </Container>
  );
};

export default Dashboard;
