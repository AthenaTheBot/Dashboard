import { useState, useEffect } from "react";
import styles from "../styles/Container.module.scss";

const Container = ({ bgGradientColor = "var(--primary-theme)", children }) => {
  const [gradientColor, setGradientColor] = useState();
  const [gradientOpacity, setGradientOpacity] = useState(1);

  useEffect(() => {
    setGradientOpacity(1);

    setGradientColor(bgGradientColor);

    setGradientOpacity(0);
  }, [bgGradientColor]);

  return (
    <div className={styles.container}>
      <div
        style={{
          "--bgGradientColor": gradientColor,
          "--bgGradientOpacity": gradientOpacity,
        }}
        className={styles.bgGradient}
      ></div>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default Container;
