const DashReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "SET_SERVERS":
      return {
        ...state,
        servers: action.payload,
      };

    case "SET_COMMANDS":
      return {
        ...state,
        commands: action.payload,
      };

    case "SET_CURRENT_SERVER":
      return {
        ...state,
        currentServer: action.payload,
      };

    case "SET_SETTINGS_UPDATED":
      return {
        ...state,
        settingsUpdated: action.payload,
      };

    default:
      return state;
  }
};

export default DashReducer;
