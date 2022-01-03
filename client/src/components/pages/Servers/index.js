import { Fragment, useContext, useEffect } from "react";
import { Helmet } from "react-helmet";

import Cookie from "js-cookie";

import dashContext from "../../../context/dash/dashContext";

import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import Server from "./Server";
import Loader from "../../layout/Loader";

import "./style.css";

function Servers() {
  const { getUserGuilds, servers } = useContext(dashContext);

  useEffect(
    () => {
      if (process.env.NODE_ENV === "production") {
        const isValidSession = Cookie.get("session");

        if (!isValidSession) return window.location.replace("/oauth/login");

        if (!servers) getUserGuilds();
      }
    },
    // eslint-disable-next-line
    []
  );

  return (
    <Fragment>
      <Helmet>
        <title>Servers - Athena</title>
      </Helmet>
      <div className="athena-servers-container">
        <Navbar />
        <div className="athena-servers">
          <div className="athena-servers-head">
            <h1>Your Servers</h1>
            <p>All of the servers that you can manage are listed here..</p>
          </div>
          <div className="athena-servers-body">
            {servers ? (
              servers?.map((server) => {
                let name =
                  server.name.length >= 13
                    ? server.name.slice(0, 11) + ".."
                    : server.name;
                return (
                  <Server
                    id={server.id}
                    name={name}
                    icon={
                      server.icon ? server.icon : "/assets/images/default.png"
                    }
                  />
                );
              })
            ) : (
              <Loader active={true} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Fragment>
  );
}

export default Servers;
