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
        servers: action.servers,
      };

    case "SET_COMMANDS":
      return {
        ...state,
        commands: action.payload,
      };

    default:
      return state;
  }
};

export default DashReducer;
