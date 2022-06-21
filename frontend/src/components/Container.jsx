import { useState, useEffect } from "react";
import styles from "../styles/Container.module.scss";

const Container = ({
  id,
  className,
  bgGradientColor = "var(--primary-theme)",
  children,
}) => {
  const [gradientColor, setGradientColor] = useState();
  const [gradientOpacity, setGradientOpacity] = useState(1);

  useEffect(() => {
    setGradientOpacity(1);

    setGradientColor(bgGradientColor);

    setGradientOpacity(0);
  }, [bgGradientColor]);

  return (
    <div id={id}>
      <div
        style={{
          "--bgGradientColor": gradientColor,
          "--bgGradientOpacity": gradientOpacity,
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
