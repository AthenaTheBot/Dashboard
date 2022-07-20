import { Fragment, useEffect, useState } from "react";
import styles from "../styles/SelectInput.module.scss";

const SelectInput = ({
  active = {},
  options = [],
  onFocus = () => {},
  onBlur = () => {},
  onSelect = () => {},
}) => {
  const [inputValue, setInputValue] = useState(active?.label || "");
  const [optionsToShow, setOptionsToShow] = useState(options) || {};
  const [optionsEnabled, setOptionsEnabled] = useState(false);

  // TODO: Nothing selected warning and another input to make options not selected state.
  useEffect(() => {
    if (!active?.label || !options) return;
    setInputValue(active.label);
    setOptionsToShow(options);
  }, [active, options, setInputValue, setOptionsToShow]);

  useEffect(() => {
    if (!inputValue) return setOptionsToShow(options);

    const newOptionsToShow = options.filter((x) =>
      x?.label?.toLowerCase()?.includes(inputValue?.toLowerCase())
    );

    setOptionsToShow(newOptionsToShow);

    //eslint-disable-next-line
  }, [inputValue]);

  const inputChanged = (event) => {
    setInputValue(event?.target?.value);

    setOptionsEnabled(true);

    const option = options?.find(
      (x) =>
        x?.label?.trim()?.toLowerCase() ===
        event?.target?.value?.trim()?.toLowerCase()
    );

    if (option) optionSelected(option);
  };

  const optionSelected = (option) => {
    setInputValue(option.label);

    onSelect(option);

    setOptionsEnabled(false);
  };

  useEffect(() => {
    setInputValue(active?.label || "");
  }, [active]);

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.main}
        placeholder={!inputValue ? "Nothing selected" : ""}
        value={inputValue}
        onChange={inputChanged}
        onFocus={(e) => {
          setOptionsEnabled(true);
          onFocus(e);
        }}
        onBlur={(e) => {
          if (e.relatedTarget) return;
          onBlur(e);
          setOptionsEnabled(false);
          setInputValue(active.label || "");
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
              if (!option?.id || !option?.label)
                return <Fragment key={index} />;

              return (
                <div
                  key={index}
                  onClick={() => {
                    optionSelected(option);
                  }}
                  className={styles.option}
                >
                  {option?.label?.trim()}
                </div>
              );
            })
          : "Nothing to show"}
      </div>
    </div>
  );
};

export default SelectInput;
