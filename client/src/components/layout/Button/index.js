import "./style.css";

function Button({ children, bgColor, color, buttonClicked }) {
  return (
    <div
      className="athena-button"
      style={{
        backgroundColor: bgColor,
        color: color,
      }}
      onClick={(e) => {
        if (buttonClicked) buttonClicked(e);
      }}
    >
      {children}
    </div>
  );
}

export default Button;
