import { FiMenu, FiX } from "react-icons/fi";
import { useState, useContext, Fragment } from "react";

import UserContext from "../context/User/UserContext";
import Link from "./Link";
import User from "./User";

import $ from "jquery";

import styles from "../styles/Navbar.module.scss";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = (e) => {
    if (collapsed) {
      setCollapsed(false);
      $("html").addClass("scrollDisabled");
    } else {
      setCollapsed(true);
      if ($("html").attr("class").trim().split(" ").length === 1)
        $("html").removeAttr("class");
      else $("html").removeClass("scrollDisabled");
    }
  };

  return (
    <div
      className={`${styles.navbar}${
        collapsed ? "" : " " + styles.navbarActive
      }`}
    >
      <div className={styles.navbarWrapper}>
        <div className={styles.navLeft}>
          <img src="/logo.png" width={64} height={64} alt="Athena" />
        </div>
        <div className={styles.navRight}>
          {collapsed ? (
            <FiMenu onClick={toggleNavbar} className={styles.navToggleBtn} />
          ) : (
            <FiX onClick={toggleNavbar} className={styles.navToggleBtn} />
          )}
          <ul onClick={toggleNavbar} className={styles.navLinks}>
            <Link passive to="/">
              Home
            </Link>
            <Link passive to="/commands">
              Commands
            </Link>
            {user ? (
              <Link passive to="/servers">
                Servers
              </Link>
            ) : (
              <Fragment />
            )}
            <Link noIcon to="/redirects/support">
              Support
            </Link>
            <User />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
