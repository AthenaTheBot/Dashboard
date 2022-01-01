import { useReducer } from "react";
import { useCookies } from "react-cookie";
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

    const user = await fetch("/api/users/@me")
      .then((res) => res.json())
      .catch((err) => null);

    if (!user) return;

    dispatch({ type: "SET_USER", payload: user });
  };

  const getCommands = async (force) => {
    if (!force && state.commands) return;

    const commands = await fetch("/api/commands")
      .then((res) => res.json())
      .catch((err) => null);

    console.log(commands);

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