import { useReducer } from "react";

import UtilsStateContext from "./UtilsContext";
import UtilsStateReducer from "./UtilsReducer";

const UtilsState = (props) => {
  const [state, dispatch] = useReducer(UtilsStateReducer, {
    commands: null,
    availableLanguages: null,
  });

  const getCommands = async (force = false) => {
    if (!force && state?.commands) return;

    const commands = await fetch("/api/commands")
      .then((res) => {
        if (res.status === 200) return res.json();
        else return null;
      })
      .catch((err) => null);

    if (!commands) return;

    const allCommands = [];
    commands.forEach((category) => {
      category.commands.forEach((command) => {
        allCommands.push(command);
      });
    });

    commands?.push({
      category: "All",
      commands: allCommands,
    });

    dispatch({
      type: "SET_COMMANDS",
      payload: commands,
    });
  };

  const getAvailableLanguages = async (force = false) => {
    if (!force && state?.availableLanguages) return;

    const availableLanguages = await fetch("/api/available-languages")
      .then((res) => {
        if (res.status === 200) return res.json();
        else return null;
      })
      .catch((err) => null);

    if (availableLanguages) {
      dispatch({
        type: "SET_AVAILABLE_LANGUAGES",
        payload: availableLanguages,
      });
    }
  };

  return (
    <UtilsStateContext.Provider
      value={{
        ...state,
        getCommands,
        getAvailableLanguages,
      }}
    >
      {props.children}
    </UtilsStateContext.Provider>
  );
};

export default UtilsState;
