import styles from "../styles/ColorInput.module.scss";

import { useEffect, useState } from "react";
import validator from "validator";

const ColorInput = ({ value = "#000000", onChange = () => {} }) => {
  const [color, setColor] = useState(
    validator.isHexColor(`${value}`) ? value : "#000000"
  );
  const [input, setInput] = useState(null);

  const inputClicked = () => {
    if (input) {
      input?.click();
    }
  };
  const inputChanged = (e) => {
    setColor(e.currentTarget.value);

    if (onChange && typeof onChange === "function")
      onChange(e.currentTarget.value);
  };

  useEffect(() => {
    setColor(value);
  }, [value, setColor]);

  return (
    <div className={styles.container} onClick={inputClicked}>
      <input
        ref={(x) => setInput(x)}
        type="color"
        className={styles.colorPreview}
        value={color}
        onChange={inputChanged}
      ></input>
      <div className={styles.colorValue}>{color}</div>
    </div>
  );
};

export default ColorInput;
