import "./style.css";

function Dropdown({ options = [], disabled = true, optionClicked = () => {} }) {
  let optionCount = 0;
  return (
    <ul className={disabled ? "dropdown disabled" : "dropdown"}>
      {options?.map((option) => {
        return (
          <li
            style={{ color: `${option.color}` }}
            key={optionCount++}
            onClick={() => {
              optionClicked(option);
            }}
          >
            {option.label}
          </li>
        );
      })}
    </ul>
  );
}

export default Dropdown;
