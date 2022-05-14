import { useContext, useEffect } from "react";

import styles from "../styles/Servers.page.module.scss";

import ServersContext from "../context/Servers/ServersContext";

import Container from "../components/Container";
import Navbar from "../components/Navbar";
import Server from "../components/Server";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Servers = () => {
  const { servers, getServers } = useContext(ServersContext);

  useEffect(() => {
    if (!servers) setTimeout(getServers, 500);
  }, [servers, getServers]);

  return (
    <Container bgGradientColor="var(--third-theme)">
      <Navbar />
      <div className={styles.header}>
        <h1>Servers</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          {servers ? (
            servers.map((server) => {
              return (
                <Server id={server.id} name={server.name} icon={server.icon} />
              );
            })
          ) : (
            <Loader message="Fetching servers" />
          )}
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Servers;
