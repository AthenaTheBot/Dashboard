import "./style.css";

function Button({ id, children, bgColor, color, buttonClicked }) {
  return (
    <div
      id={id}
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
