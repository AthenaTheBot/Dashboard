import { useReducer } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import UserContext from "./userContext";
import UserReducer from "./userReducer";

const initialState = {
  user: null,
  userServers: null,
};

const UserState = (props) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);
  const [cookies] = useCookies(0);

  const getUser = async () => {
    if (!cookies?.session) return;
    const user = await $.get("/api/users/@me").catch((err) => {});
    if (!user) return;
    dispatch({ type: "GET_USER", payload: user });
  };

  const getUserServers = async () => {
    if (!cookies?.session) return;
    const servers = await $.get("/api/users/@me/guilds").catch((err) => {});
    if (!servers) return;
    dispatch({ type: "GET_USER_SERVERS", payload: servers });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUser,
        getUserServers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
