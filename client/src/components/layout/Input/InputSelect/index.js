import { useState, useEffect } from "react";
import $ from "jquery";

// Syling
import "./style.css";

const InputSelect = ({ options, inputUpdated }) => {
  const [inputOptions, setInputOptions] = useState([]);
  const [active, setActive] = useState();
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

    newInputOptions.push(active);

    newInputOptions = newInputOptions.filter((x) => x !== option);

    setActive(option);

    setInputOptions(newInputOptions);

    if (inputUpdated) inputUpdated(option);

    toggleOptionsMenu();
  };

  const toggleOptionsMenu = () => {
    const isActive = $(".athena-input-options").hasClass(
      "athena-input-options-active"
    );
    if (isActive)
      $(".athena-input-options").removeClass("athena-input-options-active");
    else $(".athena-input-options").addClass("athena-input-options-active");
  };

  return (
    <div className="athena-input-select-container">
      <div className="athena-input-select-main" onClick={toggleOptionsMenu}>
        <p>{active?.content ? active.content : "Not selected"}</p>
      </div>
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
    </div>
  );
};

export default InputSelect;
