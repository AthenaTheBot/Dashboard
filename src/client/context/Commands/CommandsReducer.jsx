const CommandsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMANDS":
      return {
        ...state,
        commands: action.payload,
      };

    default:
      return state;
  }
};

export default CommandsReducer;
