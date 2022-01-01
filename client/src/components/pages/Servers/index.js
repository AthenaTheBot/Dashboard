import { useContext, useEffect } from "react";

import dashContext from "../../../context/dash/dashContext";

import Navbar from "../../layout/Navbar";
import Footer from "../../layout/Footer";
import Server from "./Server";
import Loader from "../../layout/Loader";

import "./style.css";

function Servers() {
  const { getUserServers, servers } = useContext(dashContext);

  useEffect(
    () => {
      getUserServers();
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {}, [servers]);

  return (
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
              return <Server />;
            })
          ) : (
            <Loader active={false} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Servers;
