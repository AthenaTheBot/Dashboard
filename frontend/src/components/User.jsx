import { useContext } from "react";
import { LazyLoadImage as LazyImage } from "react-lazy-load-image-component";

import UserContext from "../context/User/UserContext";
import Link from "../components/Link";

import styles from "../styles/User.module.scss";

function User() {
  const { user } = useContext(UserContext);

  if (user) {
    return (
      <div
        onClick={() => {
          window.location.replace("/oauth/logout");
        }}
        className={styles.userContainer}
      >
        {user?.avatar ? (
          <LazyImage
            effect="opacity"
            placeholder={
              <div className={styles.avatarPlaceHolder}>
                {user?.username?.trim()?.slice(0, 1) || "A"}
              </div>
            }
            src={user?.avatar}
            alt={user?.username}
          />
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
