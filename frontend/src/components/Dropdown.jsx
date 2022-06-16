import styles from "../styles/Dropdown.module.scss";

function Dropdown({ enabled = false, options = [] }) {
  return (
    <div className={`${styles.container} ${enabled ? styles.enabled : ""}`}>
      <ul>
        {options?.map((option) => {
          return <li>{option}</li>;
        })}
      </ul>
    </div>
  );
}

export default Dropdown;
