import { useState, useEffect } from "react";
import styles from "../styles/TextInput.module.scss";

const TextInput = ({
  className,
  initialValue = "",
  strict,
  onChange = () => {},
}) => {
  const [inputValue, setInputValue] = useState(initialValue);
  const inputChanged = (e) => {
    if (strict) return;
    setInputValue(e?.target?.value);
    onChange(e?.target?.value);
  };

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue, setInputValue]);

  return (
    <input
      className={`${styles.textInput}${className ? " " + className : ""}`}
      onChange={inputChanged}
      value={inputValue}
      type="text"
    />
  );
};

export default TextInput;
