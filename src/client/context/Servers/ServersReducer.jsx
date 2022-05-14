const ServerReducer = (state, action) => {
  switch (action.type) {
    case "SET_SERVERS":
      return {
        ...state,
        servers: action.payload,
      };
    default:
      return state;
  }
};

export default ServerReducer;
