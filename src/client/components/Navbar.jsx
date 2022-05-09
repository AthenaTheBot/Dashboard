import styles from "../styles/Navbar.module.scss";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import Link from "./Link";

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = (e) => {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  };

  return (
    <div className={`${styles.navbar} ${collapsed ? "" : styles.navbarActive}`}>
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
          <ul className={styles.navLinks}>
            <Link passive to="/">
              Home
            </Link>
            <Link passive to="/commands">
              Commands
            </Link>
            <Link to="/support">Support</Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
