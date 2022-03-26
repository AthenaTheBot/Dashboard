import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import $ from "jquery";
import "./style.css";

function Role({ id, color, name, onRoleRemove }) {
  const removeRole = () => {
    if (onRoleRemove && typeof onRoleRemove === "function") {
      onRoleRemove(id);
    }
  };

  useEffect(() => {
    $(".athena-role-color")
      .mouseenter(function () {
        $(this).children().css("display", "block");
      })
      .mouseleave(function () {
        $(this).children().removeAttr("style");
      });
  });

  return (
    <div style={{ borderColor: color }} className="athena-role-container">
      <div
        onClick={removeRole}
        style={{ backgroundColor: color }}
        className="athena-role-color"
      >
        <AiOutlineClose />
      </div>
      <div className="athena-role-name">{name}</div>
    </div>
  );
}

export default Role;
