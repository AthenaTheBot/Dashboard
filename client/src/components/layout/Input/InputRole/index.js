import { Fragment, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Role from "./Role";
import MenuRole from "./MenuRole";
import "./style.css";

function InputRole({
  currentRoles,
  menuRoles,
  roleLimit,
  onRoleAdded,
  onRoleRemvoed,
}) {
  const [roleMenuState, setRoleMenuState] = useState(false);

  let currentRoleCount = 0;
  let menuRoleCount = 0;

  const roleRemoved = (roleId) => {
    if (onRoleRemvoed && typeof onRoleRemvoed === "function") {
      onRoleRemvoed(roleId);
    }
  };

  const roleAdded = (roleId) => {
    if (onRoleAdded && typeof onRoleAdded === "function") {
      onRoleAdded(roleId);
    }
  };

  const toggleRoleMenu = () => {
    if (!menuRoles?.length) return;
    setRoleMenuState(roleMenuState ? false : true);
  };

  return (
    <div className="athena-input-role-container">
      <div className="athena-input-roles">
        {currentRoles?.length
          ? currentRoles?.map((role) => {
              currentRoleCount++;
              return (
                <Role
                  key={currentRoleCount}
                  color={role.color}
                  name={role.name}
                  id={role.id}
                  onRoleRemove={roleRemoved}
                />
              );
            })
          : "None"}
      </div>
      {currentRoles?.length === roleLimit ? (
        <Fragment></Fragment>
      ) : (
        <div onClick={toggleRoleMenu} className="athena-input-roles-add-btn">
          <BsPlusCircle />
        </div>
      )}
      {menuRoles?.length > 0 && roleMenuState ? (
        <div className="athena-input-roles-add-menu">
          {menuRoles?.map((menuRole) => {
            menuRoleCount++;
            return (
              <MenuRole
                key={menuRoleCount}
                color={menuRole.color}
                name={menuRole.name}
                id={menuRole.id}
                onRoleClick={roleAdded}
              />
            );
          })}
        </div>
      ) : (
        <Fragment />
      )}
    </div>
  );
}

export default InputRole;
