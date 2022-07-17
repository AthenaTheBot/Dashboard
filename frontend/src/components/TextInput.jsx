import { useState, useEffect } from "react";
import styles from "../styles/TextInput.module.scss";

const TextInput = ({
  id,
  className,
  value = "",
  type = "text",
  role,
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

  if (role === "textarea") {
    return (
      <textarea
        id={id}
        className={`${styles.textInput}${className ? " " + className : ""}`}
        onChange={inputChanged}
        value={inputValue}
        type={type}
        role={role}
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
        role={role}
      />
    );
  }
};

export default TextInput;
