import { useState } from "react";
import styles from "../styles/TextInput.module.scss";

const TextInput = ({ initialValue, children, onChange = () => {} }) => {
  const [inputValue, setInputValue] = useState(initialValue || "");
  const inputChanged = (e) => {
    setInputValue(e?.target?.value);
    onChange(e?.target?.value);
  };

  return (
    <input
      className={styles.textInput}
      onChange={inputChanged}
      value={inputValue}
      type="text"
    />
  );
};

export default TextInput;
