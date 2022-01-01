import { useNavigate } from "react-router-dom";
import "./style.css";

function Dropdown({ options = [], disabled = true }) {
  const navigate = useNavigate();
  const redirect = (to, passive = true) => {
    if (passive) {
      navigate(to);
    } else {
      window.location.replace(to);
    }
  };

  let optionCount = 0;

  return (
    <ul className={disabled ? "dropdown disabled" : "dropdown"}>
      {options?.map((option) => {
        return (
          <li
            style={{ color: `${option.color}` }}
            key={optionCount++}
            onClick={() => {
              redirect(option.link, option.passive);
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
