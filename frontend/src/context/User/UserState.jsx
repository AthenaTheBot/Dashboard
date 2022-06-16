import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { useReducer } from "react";
import Cookie from "js-cookie";

const UserState = (props) => {
  const [state, dispatch] = useReducer(UserReducer, {
    user: null,
  });

  const getUser = async (force = false) => {
    const sessionCookie = Cookie.get("session");

    if (!sessionCookie || (!force && state?.user)) return;

    const userData = await fetch("/api/users/@me")
      .then((res) => {
        if (res.status === 200) return res.json();
        else return null;
      })
      .catch((err) => null);

    if (!userData) return;

    dispatch({
      type: "SET_USER",
      payload: userData,
    });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        getUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
