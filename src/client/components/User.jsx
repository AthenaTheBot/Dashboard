import { useContext, useEffect } from "react";

import UserContext from "../context/User/UserContext";
import Link from "../components/Link";

import styles from "../styles/User.module.scss";

function User() {
  const { user, getUser } = useContext(UserContext);

  useEffect(() => {
    if (!user) getUser(false);
    //eslint-disable-next-line
  }, []);

  if (user) {
    return (
      <div
        onClick={() => {
          window.location.replace("/oauth/logout");
        }}
        className={styles.userContainer}
      >
        {user?.avatar ? (
          <img src={user?.avatar} alt={user?.username} />
        ) : (
          <div className={styles.avatarPlaceHolder}>
            {user?.username?.trim()?.slice(0, 1)}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <Link noIcon noNewPage to="/oauth/login">
        Login
      </Link>
    );
  }
}

export default User;
