import styles from "../styles/ColorInput.module.scss";

import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import TextInput from "./TextInput";

const ColorInput = ({ value, onChange }) => {
  const [color, setColor] = useState(value);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    setColor(value);
  }, [value, setColor]);

  const onInputChange = (newValue) => {
    setColor(newValue);
    if (onChange && typeof onChange === "function") onChange(newValue);
  };

  return (
    <div className={styles.container}>
      <div
        onFocus={() => {
          setShowPicker(true);
        }}
      >
        <TextInput strict onChange={onInputChange} value={color} />
      </div>
      <HexColorPicker
        className={`${styles.colorPicker} ${
          !showPicker ? styles.disabled : ""
        }`}
        color={color}
        onChange={onInputChange}
        onFocus={() => {
          setShowPicker(true);
        }}
        onBlur={() => {
          setShowPicker(false);
        }}
      />
    </div>
  );
};

export default ColorInput;
