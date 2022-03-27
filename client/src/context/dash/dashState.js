import { useReducer } from "react";
import { useCookies } from "react-cookie";
import DashContext from "./dashContext";
import DashReducer from "./dashReducer";

const initialState = {
  user: null,
  servers: null,
  commands: null,
  currentServer: null,
  availableLanguages: null,
};

const DashState = (props) => {
  const [state, dispatch] = useReducer(DashReducer, initialState);
  const [cookies] = useCookies(0);

  const getUser = async (force) => {
    if (!cookies?.session) return;

    if (!force && state.user) return;

    const user = await fetch("/api/users/@me")
      .then(async (res) => {
        if (!res.ok) return null;
        return await res.json();
      })
      .then((res) => res.data)
      .catch((err) => null);

    if (!user) return;

    dispatch({ type: "SET_USER", payload: user });
  };

  const getUserGuilds = async (force) => {
    if ((!force && state.servers) || !cookies?.session) return;

    const servers = await fetch("/api/users/@me/guilds")
      .then(async (res) => {
        if (!res.ok) return null;
        return await res.json();
      })
      .then((res) => res.data)
      .catch((err) => null);

    if (!servers) return;

    dispatch({ type: "SET_SERVERS", payload: servers });
  };

  const getCommands = async (force) => {
    if (!force && state.commands) return;

    const commands = await fetch("/api/commands")
      .then(async (res) => {
        if (!res.ok) return null;
        return await res.json();
      })
      .then((res) => res.data)
      .catch((err) => null);

    if (!commands) return;

    dispatch({ type: "SET_COMMANDS", payload: commands });
  };

  const getAvailableLanguages = async (force) => {
    if (!force && state?.availableLangauges) return;

    const availableLangauges = await fetch("/api/available-languages")
      .then(async (res) => {
        if (!res.ok) return null;
        return await res.json();
      })
      .then((res) => res.data)
      .catch((err) => null);

    if (!availableLangauges) return;

    dispatch({ type: "SET_AVAILABLE_LANGUAGES", payload: availableLangauges });
  };

  const setCurrentServer = async (guild) => {
    dispatch({ type: "SET_CURRENT_SERVER", payload: guild });
  };

  return (
    <DashContext.Provider
      value={{
        ...state,
        getUser,
        getUserGuilds,
        getCommands,
        getAvailableLanguages,
        setCurrentServer,
      }}
    >
      {props.children}
    </DashContext.Provider>
  );
};

export default DashState;
