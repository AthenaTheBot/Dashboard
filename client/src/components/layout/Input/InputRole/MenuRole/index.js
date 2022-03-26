import "./style.css";

function MenuRole({ id, color, name, onRoleAdd }) {
  const roleClicked = () => {
    if (onRoleAdd && typeof onRoleAdd === "function") {
      onRoleAdd({ id, name, color });
    }
  };

  return (
    <div onClick={roleClicked} className="athena-input-menu-role">
      <div
        style={{ backgroundColor: color }}
        className="athena-input-menu-role-color"
      ></div>
      <div className="athena-input-menu-role-name">{name}</div>
    </div>
  );
}

export default MenuRole;
