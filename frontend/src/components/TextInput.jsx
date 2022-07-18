import { useState, useEffect } from "react";
import styles from "../styles/TextInput.module.scss";

// TODO: Url support for text input
const TextInput = ({
  id,
  className,
  value = "",
  type = "text",
  expandable,
  strict,
  onChange = () => {},
}) => {
  const [inputValue, setInputValue] = useState(value);
  const inputChanged = (e) => {
    if (strict) return;
    setInputValue(e?.target?.value);
    onChange(e?.target?.value);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value, setInputValue]);

  if (expandable) {
    return (
      <textarea
        id={id}
        className={`${styles.textInput}${className ? " " + className : ""}`}
        onChange={inputChanged}
        value={inputValue}
        type={type}
      />
    );
  } else {
    return (
      <input
        id={id}
        className={`${styles.textInput}${className ? " " + className : ""}`}
        onChange={inputChanged}
        value={inputValue}
        type={type}
      />
    );
  }
};

export default TextInput;
