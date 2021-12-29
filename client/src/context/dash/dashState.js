import { useReducer } from "react";
import { useCookies } from "react-cookie";
import $ from "jquery";
import DashContext from "./dashContext";
import DashReducer from "./dashReducer";

const initialState = {
  user: null,
  commands: null,
};

const DashState = (props) => {
  const [state, dispatch] = useReducer(DashReducer, initialState);
  const [cookies] = useCookies(0);

  const getUser = async (force) => {
    if (!cookies?.session) return;

    if (!force && state.user) return;

    const user = await $.get("/api/users/@me").catch((err) => {});

    if (!user) return;

    dispatch({ type: "SET_USER", payload: user });
  };

  const getCommands = async (force) => {
    if (!force && state.commands) return;

    const commands = await $.get("/api/commands").catch((err) => {});

    if (!commands) return;

    dispatch({ type: "SET_COMMANDS", payload: commands });
  };

  return (
    <DashContext.Provider
      value={{
        ...state,
        getUser,
        getCommands,
      }}
    >
      {props.children}
    </DashContext.Provider>
  );
};

export default DashState;
