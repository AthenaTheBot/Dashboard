import { Fragment, useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Role from "./Role";
import MenuRole from "./MenuRole";
import "./style.css";

function InputRole({
  roles,
  roleLimit,
  onRoleAdd,
  onRoleRemove,
  onRoleUpdate,
}) {
  const [roleMenuState, setRoleMenuState] = useState(false);
  const [_currentRoles, _setCurrentRoles] = useState([]);
  const [_menuRoles, _setMenuRoles] = useState([]);

  let currentRoleCount = 0;
  let menuRoleCount = 0;

  useEffect(() => {
    const __menuRoles = roles.filter((x) => !x.active);
    const __currentRoles = roles.filter((x) => x.active);

    _setCurrentRoles(__currentRoles);
    _setMenuRoles(__menuRoles);
  }, [roles]);

  const roleRemoved = (role) => {
    let newCurrentRoles = _currentRoles.filter((x) => x.id !== role.id);
    let newMenuRoles = [..._menuRoles, role];

    _setCurrentRoles(newCurrentRoles);
    _setMenuRoles(newMenuRoles);

    setRoleMenuState(false);

    if (onRoleRemove && typeof onRoleRemove === "function") {
      onRoleRemove(role, _currentRoles);
    }

    roleUpdated(newCurrentRoles);
  };

  const roleAdded = (role) => {
    let newCurrentRoles = [..._currentRoles, role];
    let newMenuRoles = _menuRoles.filter((x) => x.id !== role.id);

    _setCurrentRoles(newCurrentRoles);
    _setMenuRoles(newMenuRoles);

    setRoleMenuState(false);

    if (onRoleAdd && typeof onRoleAdd === "function") {
      onRoleAdd(role);
    }

    roleUpdated(newCurrentRoles);
  };

  const roleUpdated = (data) => {
    if (onRoleUpdate && typeof onRoleUpdate === "function") {
      onRoleUpdate(data);
    }
  };

  const toggleRoleMenu = (e) => {
    if (!_menuRoles?.length) return;
    if (roleMenuState) setRoleMenuState(false);
    else setRoleMenuState(true);
  };

  return (
    <div className="athena-input-role-container">
      <div className="athena-input-role-wrapper">
        <div className="athena-input-roles">
          {_currentRoles?.length
            ? _currentRoles?.map((role) => {
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
        {_currentRoles?.length === roleLimit ? (
          <Fragment></Fragment>
        ) : (
          <div onClick={toggleRoleMenu} className="athena-input-roles-add-btn">
            <BsPlusCircle />
          </div>
        )}
      </div>
      {_menuRoles?.length > 0 && roleMenuState ? (
        <div className="athena-input-roles-add-menu">
          {_menuRoles?.map((menuRole) => {
            menuRoleCount++;
            return (
              <MenuRole
                key={menuRoleCount}
                color={menuRole.color}
                name={menuRole.name}
                id={menuRole.id}
                onRoleAdd={roleAdded}
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
