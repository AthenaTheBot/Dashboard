import { useState, useEffect } from "react";
import styles from "../styles/Container.module.scss";

const Container = ({
  id,
  className,
  bgGradientColor = "var(--primary-theme)",
  bgGradientEndColor = "var(--primary-background)",
  children,
}) => {
  const [gradientColor, setGradientColor] = useState();
  const [gradientEndColor, setGradientEndColor] = useState();
  const [gradientOpacity, setGradientOpacity] = useState(1);

  useEffect(() => {
    setGradientOpacity(1);

    setGradientColor(bgGradientColor);
    setGradientEndColor(bgGradientEndColor);

    setGradientOpacity(0);
  }, [bgGradientColor, bgGradientEndColor]);

  return (
    <div id={id}>
      <div
        style={{
          "--bgGradientColor": gradientColor,
          "--bgGradientOpacity": gradientOpacity,
          "--bgGradientEndColor": gradientEndColor,
        }}
        className={styles.bgGradient}
      ></div>
      <div className={`${styles.wrapper}${className ? " " + className : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Container;
