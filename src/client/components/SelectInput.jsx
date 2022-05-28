import { Fragment, useEffect, useState } from "react";
import styles from "../styles/SelectInput.module.scss";

const SelectInput = ({ options = [], children, onSelect = () => {} }) => {
  const [inputValue, setInputValue] = useState("");
  const [optionsToShow, setOptionsToShow] = useState(options);
  const [optionsEnabled, setOptionsEnabled] = useState(false);

  const inputChanged = (event) => {
    setOptionsEnabled(true);

    setInputValue(event?.target?.value);

    const option = options?.find(
      (x) =>
        x?.content?.trim()?.toLowerCase() ===
        event?.target?.value?.trim()?.toLowerCase()
    );

    if (option) optionSelected(option);
  };

  const optionSelected = (option) => {
    setInputValue(option.content);

    onSelect(option);

    setOptionsEnabled(false);
  };

  useEffect(() => {
    const newOptionsToShow = options.filter((x) =>
      x?.content?.toLowerCase()?.startsWith(inputValue?.toLowerCase())
    );

    setOptionsToShow(newOptionsToShow);

    //eslint-disable-next-line
  }, [inputValue]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.main}
        value={inputValue}
        onChange={inputChanged}
        onFocus={() => {
          setOptionsEnabled(true);
        }}
        onBlur={(e) => {
          if (e.relatedTarget) return;
          setOptionsEnabled(false);
        }}
      />
      <div
        tabIndex={0}
        className={`${styles.options} ${
          optionsEnabled ? styles.optionsEnabled : ""
        }`}
      >
        {optionsToShow.length > 0
          ? optionsToShow.map((option, index) => {
              if (!option?.id || !option?.content) return <Fragment />;

              return (
                <div
                  key={index}
                  onClick={() => {
                    optionSelected(option);
                  }}
                  className={styles.option}
                >
                  {option?.content?.trim()}
                </div>
              );
            })
          : "Nothing to show"}
      </div>
    </div>
  );
};

export default SelectInput;
