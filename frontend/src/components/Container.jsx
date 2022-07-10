import { useState, useEffect, Fragment } from "react";
import styles from "../styles/Container.module.scss";

const Container = ({
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
    <Fragment>
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
    </Fragment>
  );
};

export default Container;
