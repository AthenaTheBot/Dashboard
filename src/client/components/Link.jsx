import { Link as PassiveLink } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const Link = ({ id, className, passive, to, children }) => {
  if (passive) {
    return (
      <PassiveLink to={to} id={id} className={className}>
        {children}
      </PassiveLink>
    );
  } else {
    return (
      <a
        href={to}
        id={id}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
        <FiExternalLink style={{ marginLeft: "5px" }} />
      </a>
    );
  }
};

export default Link;
