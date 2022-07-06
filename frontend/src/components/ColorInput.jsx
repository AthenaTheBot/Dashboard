import styles from "../styles/ColorInput.module.scss";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";

import TextInput from "./TextInput";

const ColorInput = () => {
  const [color, setColor] = useState("#ffff");
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className={styles.container}>
      <div
        onFocus={() => {
          setShowPicker(true);
        }}
      >
        <TextInput strict onChange={setColor} value={color} />
      </div>
      <HexColorPicker
        className={`${styles.colorPicker} ${
          !showPicker ? styles.disabled : ""
        }`}
        color={color}
        onChange={setColor}
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
