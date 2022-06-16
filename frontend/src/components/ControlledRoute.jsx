import { Navigate as PassiveNavigate } from "react-router-dom";

const ControlledRoute = ({ element, restriction }) => {
  const [canView, newPath, passiveLink] = restriction();

  if (canView) {
    return element;
  } else {
    return passiveLink ? (
      <PassiveNavigate to={newPath} />
    ) : (
      window.location.replace(newPath)
    );
  }
};

export default ControlledRoute;
