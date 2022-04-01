import { useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context
import DashContext from "./context/dash/dashContext";

// Pages
import Main from "./components/pages/Main";
import Commands from "./components/pages/Commands";
import PageNotFound from "./components/pages/PageNotFound";
import Legal from "./components/pages/Legal";
import Error from "./components/pages/Error";
import Servers from "./components/pages/Servers";
import Dashboard from "./components/pages/Dashboard";
import Development from "./components/pages/Development";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const App = () => {
  const { getUser } = useContext(DashContext);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/commands" element={<Commands />} />

        <Route path="/servers" element={<Servers />} />

        <Route path="/dashboard/:guildId/" element={<Dashboard />} />

        <Route path="/dashboard/:guildId/:category" element={<Dashboard />} />

        <Route path="/privacy" element={<Legal page="privacy" />} />

        <Route path="/terms" element={<Legal page="terms" />} />

        <Route path="/error" element={<Error />} />

        <Route path="/development" element={<Development />} />

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
