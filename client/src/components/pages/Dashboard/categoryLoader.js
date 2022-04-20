import Overview from "./Categories/Overview";
import Settings from "./Categories/Settings";
import Moderation from "./Categories/Moderation";
import Profile from "../../layout/Navbar/Profile";
import { Fragment } from "react";

const CategoryLoader = ({ category }) => {
  category = `${category}`;
  const capitalizedCategory =
    category.slice(0, 1).toUpperCase() + category.slice(1, category.length);

  const LoadCategory = () => {
    switch (category) {
      case "overview":
        return <Overview />;

      case "settings":
        return <Settings />;

      case "moderation":
        return <Moderation />;

      default:
        return <Fragment></Fragment>;
    }
  };

  return (
    <div className="dash-module">
      <div className="dash-module-title">
        <h1>{capitalizedCategory}</h1>
        <Profile
          drodpownOptions={[
            {
              label: "Servers",
              link: "/servers",
              passive: true,
            },
            {
              label: "Logout",
              link: "/oauth/logout",
              passive: false,
              color: "var( --primary-error)",
            },
          ]}
        />
      </div>
      <div className="dash-module-body">
        <LoadCategory />
      </div>
    </div>
  );
};

export default CategoryLoader;
export const validCategories = ["overview", "settings", "moderation"];
