import { useReducer } from "react";

import CommandsContext from "./CommandsContext";
import CommandsReducer from "./CommandsReducer";

const CommandsState = (props) => {
  const [state, dispatch] = useReducer(CommandsReducer, {
    commands: null,
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

    console.log(commands);

    dispatch({
      type: "SET_COMMANDS",
      payload: commands,
    });
  };

  return (
    <CommandsContext.Provider
      value={{
        ...state,
        getCommands,
      }}
    >
      {props.children}
    </CommandsContext.Provider>
  );
};

export default CommandsState;
