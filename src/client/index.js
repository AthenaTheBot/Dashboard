import { StrictMode, useContext, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CommandsState from "./context/Commands/CommandsState";
import UserState from "./context/User/UserState";
import ServersState from "./context/Servers/ServersState";
import ControlledRoute from "./components/ControlledRoute";
import Home from "./pages/Home";
import Commands from "./pages/Commands";
import Servers from "./pages/Servers";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import UserContext from "./context/User/UserContext";
import ServersContext from "./context/Servers/ServersContext";
import Cookie from "js-cookie";
import "./styles/globals.scss";

const root = createRoot(document.getElementById("root"));

const ServersRouteRestriction = () => {
  if (process.env.NODE_ENV === "development") return [true, null, null];
  if (Cookie.get("session")) return [true, null, null];
  else return [false, "/oauth/login", false];
};

const App = () => {
  const { getUser } = useContext(UserContext);
  const { getServers } = useContext(ServersContext);

  useEffect(() => {
    getUser();
    getServers();
    //eslint-disable-next-line
  }, []);

  return (
    <CommandsState>
      <UserState>
        <ServersState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/commands" element={<Commands />} />
              <Route
                path="/servers"
                element={
                  <ControlledRoute
                    element={<Servers />}
                    restriction={ServersRouteRestriction}
                  />
                }
              />
              <Route
                path="/dashboard/:id"
                element={
                  <ControlledRoute
                    element={<Dashboard />}
                    restriction={ServersRouteRestriction}
                  />
                }
              />
              <Route
                path="/dashboard/:id/:category"
                element={
                  <ControlledRoute
                    element={<Dashboard />}
                    restriction={ServersRouteRestriction}
                  />
                }
              />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ServersState>
      </UserState>
    </CommandsState>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
