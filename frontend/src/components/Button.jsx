import { useNavigate } from "react-router-dom";
import styles from "../styles/Button.module.scss";

const Button = ({
  id,
  className,
  children,
  to,
  passive,
  onClick = () => {},
}) => {
  const navigate = useNavigate();

  const buttonClicked = (e) => {
    if (to && passive) {
      return navigate(to);
    } else if (to) return window.location.replace(to);

    onClick(e);
  };

  return (
    <div
      id={id}
      className={`${styles.button} ${className}`}
      onClick={buttonClicked}
    >
      {children}
    </div>
  );
};

export default Button;
