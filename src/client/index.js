import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./styles/globals.scss";

import CommandsState from "./context/Commands/CommandsState";
import UserState from "./context/User/UserState";

import Home from "./pages/Home";
import Commands from "./pages/Commands";
import NotFound from "./pages/NotFound";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <CommandsState>
      <UserState>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/commands" element={<Commands />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserState>
    </CommandsState>
  </StrictMode>
);
