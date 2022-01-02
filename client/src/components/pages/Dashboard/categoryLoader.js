import Overview from "./Categories/Overview";
import Moderation from "./Categories/Moderation";
import Music from "./Categories/Music";
import { Fragment } from "react";

const CategoryLoader = ({ category }) => {
  switch (category) {
    case "overview":
      return <Overview />;

    case "moderation":
      return <Moderation />;

    case "music":
      return <Music />;

    default:
      return <Fragment></Fragment>;
  }
};

export default CategoryLoader;
