import { useReducer } from "react";
import ServersContext from "./ServersContext";
import ServerReducer from "./ServersReducer";
import Cookie from "js-cookie";

const ServersState = (props) => {
  const [state, dispatch] = useReducer(ServerReducer, {
    servers: null,
  });

  const getServers = async (force = false) => {
    const sessionCookie = Cookie.get("session");

    if (!sessionCookie || (!force && state?.user)) return;

    dispatch({
      type: "SET_LOADING",
    });

    const serverData = await fetch("/api/users/@me/guilds")
      .then((res) => {
        if (res.status === 200) return res.json();
        else return null;
      })
      .catch((err) => null);

    if (!serverData) return;

    dispatch({
      type: "SET_SERVERS",
      payload: serverData,
    });
  };

  return (
    <ServersContext.Provider
      value={{
        ...state,
        getServers,
      }}
    >
      {props.children}
    </ServersContext.Provider>
  );
};

export default ServersState;
