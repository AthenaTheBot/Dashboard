const CommandsReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payoad,
      };

    default:
      return state;
  }
};

export default CommandsReducer;
