import styles from "../styles/Toggle.module.scss";

import $ from "jquery";
import { useEffect, useState } from "react";

const Toggle = ({ active, onChange }) => {
  const [toggleActive, setToggleActive] = useState(active || false);

  useEffect(() => {
    if (active) setToggleActive(active);
  }, [active, setToggleActive]);

  const onClick = (e) => {
    let newState = null;

    if (toggleActive) newState = false;
    else newState = true;

    setToggleActive(newState);

    if (onChange && typeof onChange === "function") onChange(newState);
  };

  return (
    <div
      onClick={onClick}
      className={`${styles.container} ${
        toggleActive ? styles.containerActive : ""
      }`}
    >
      <div
        className={`${styles.inner} ${toggleActive ? styles.innerActive : ""}`}
      ></div>
    </div>
  );
};

export default Toggle;
