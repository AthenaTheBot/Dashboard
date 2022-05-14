import { Link as PassiveLink } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

const Link = ({
  id,
  className,
  passive,
  to = "/",
  children,
  noIcon = false,
  noNewPage = false,
  style = null,
}) => {
  if (passive) {
    return (
      <PassiveLink style={style} to={to} id={id} className={className}>
        {children}
      </PassiveLink>
    );
  } else {
    return (
      <a
        style={style}
        href={to}
        id={id}
        className={className}
        target={noNewPage ? "_self" : "_blank"}
        rel="noopener noreferrer"
      >
        {children}
        {!noIcon ? <FiExternalLink style={{ marginLeft: "5px" }} /> : ""}
      </a>
    );
  }
};

export default Link;
