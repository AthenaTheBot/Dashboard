import { Fragment } from "react";
import { BsPlusCircle } from "react-icons/bs";
import Role from "./Role";
import MenuRole from "./MenuRole";
import "./style.css";

function InputRole({ roles, roleLimit }) {
  return (
    <Fragment>
      <div className="athena-input-role-container">
        <div className="athena-input-roles">
          <Role color={"red"} name={"Test"} />
        </div>
        {roles?.length === roleLimit ? (
          <Fragment></Fragment>
        ) : (
          <div className="athena-input-roles-add-btn">
            <BsPlusCircle />
          </div>
        )}
        <div className="athena-input-roles-add-menu">
          <MenuRole color="red" name="Testing Role" id="124123" />
        </div>
      </div>
    </Fragment>
  );
}

export default InputRole;
