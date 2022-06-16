const UtilsReducer = (state, action) => {
  switch (action.type) {
    case "SET_COMMANDS":
      return {
        ...state,
        commands: action.payload,
      };

    case "SET_AVAILABLE_LANGUAGES":
      return {
        ...state,
        availableLanguages: action.payload,
      };

    default:
      return state;
  }
};

export default UtilsReducer;
