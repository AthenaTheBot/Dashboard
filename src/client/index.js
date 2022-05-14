import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/globals.scss";

import CommandsState from "./context/Commands/CommandsState";
import UserState from "./context/User/UserState";
import ServersState from "./context/Servers/ServersState";

import ControlledRoute from "./components/ControlledRoute";

import Home from "./pages/Home";
import Commands from "./pages/Commands";
import Servers from "./pages/Servers";
import NotFound from "./pages/NotFound";
import UserContext from "./context/User/UserContext";

const root = createRoot(document.getElementById("root"));

const ServersRouteRestriction = () => {
  const { user } = useContext(UserContext);

  if (process.env.NODE_ENV === "development") return [true, null, null];

  if (user) {
    return [true, null, null];
  } else {
    return [false, "/oauth/login", true];
  }
};

root.render(
  <StrictMode>
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
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ServersState>
      </UserState>
    </CommandsState>
  </StrictMode>
);
