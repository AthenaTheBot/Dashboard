import { Navigate as PassiveNavigate } from "react-router-dom";
import { Navigate } from "react-router";

const ControlledRoute = ({ element, restriction }) => {
  const [canView, newPath, passiveLink] = restriction();

  if (canView) {
    return element;
  } else {
    return passiveLink ? (
      <PassiveNavigate to={newPath} />
    ) : (
      <Navigate to={newPath} />
    );
  }
};

export default ControlledRoute;
