import { useState, useEffect, Fragment } from "react";

// Syling
import "./style.css";

const InputSelect = ({ options, inputUpdated }) => {
  const [inputOptions, setInputOptions] = useState([]);
  const [active, setActive] = useState();
  const [optionsEnabled, setOptionsEnabled] = useState(false);
  let optionIds = 0;

  useEffect(() => {
    const filteredInputOptions = options.filter((x) => x.active !== true);
    let activeEl = null;

    options.forEach((option) => {
      if (option.active && !activeEl) activeEl = option;
    });

    setInputOptions(filteredInputOptions);
    setActive(activeEl);
  }, [options]);

  const optionClicked = (option) => {
    let newInputOptions = inputOptions;

    if (active) newInputOptions.push(active);

    newInputOptions = newInputOptions.filter((x) => x !== option);

    setActive(option);

    setInputOptions(newInputOptions);

    if (inputUpdated) inputUpdated(option);

    toggleOptionsMenu();
  };

  const toggleOptionsMenu = () => {
    setOptionsEnabled(optionsEnabled ? false : true);
  };

  return (
    <div className="athena-input-select-container">
      <div className="athena-input-select-main" onClick={toggleOptionsMenu}>
        <p>{active?.content ? active.content : "Not selected"}</p>
      </div>
      {optionsEnabled ? (
        <ul className="athena-input-options">
          {inputOptions.map((inputOption) => {
            inputOption.compId = optionIds++;
            return (
              <li
                key={inputOption.compId}
                onClick={() => {
                  optionClicked(inputOption);
                }}
                className="athena-input-option"
              >
                {inputOption.content}
              </li>
            );
          })}
        </ul>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

export default InputSelect;
