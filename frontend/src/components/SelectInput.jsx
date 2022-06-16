import { Fragment, useEffect, useState } from "react";
import styles from "../styles/SelectInput.module.scss";

const SelectInput = ({ active = {}, options = [], onSelect = () => {} }) => {
  const [inputValue, setInputValue] = useState(active.label);
  const [optionsToShow, setOptionsToShow] = useState(options);
  const [optionsEnabled, setOptionsEnabled] = useState(false);

  useEffect(() => {
    setInputValue(active.label);
    setOptionsToShow(options);
  }, [active, options]);

  useEffect(() => {
    const newOptionsToShow = options.filter((x) =>
      x?.label?.toLowerCase()?.startsWith(inputValue?.toLowerCase())
    );

    setOptionsToShow(newOptionsToShow);

    //eslint-disable-next-line
  }, [inputValue]);

  const inputChanged = (event) => {
    setOptionsEnabled(true);

    setInputValue(event?.target?.value);

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
          setInputValue(active.label);
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
              if (!option?.id || !option?.label) return <Fragment />;

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
