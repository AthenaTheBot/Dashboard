import { Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ControlledRoute = ({ path, element, restriction }) => {
  const [canView, newPath, passiveLink] = restriction();

  if (canView) {
    return <Route path={path} element={element} />;
  } else {
    <Navigate to={newPath} replace={passiveLink} />;
  }
};

export default ControlledRoute;
