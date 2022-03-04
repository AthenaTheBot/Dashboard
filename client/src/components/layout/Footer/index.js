import { Link } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";

// Other Comp
import "./style.css";

const Footer = () => {
  return (
    <div className="athena-footer">
      <div className="athena-footer-content">
        <div className="athena-footer-brand">
          <img src="/assets/images/logo.png" alt="Athena" />
          <p>
            Athena is a multi-purpose discord bot that aims to serve every
            function of a discord bot that can perform.
          </p>
        </div>
        <div className="athena-footer-link-part">
          <ul className="athena-footer-links">
            <h3>General</h3>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/commands">Commands</Link>
            </li>
          </ul>
          <ul className="athena-footer-links">
            <h3>Legal</h3>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>
            <li>
              <a href="/support">
                Contact Us{" "}
                <FiExternalLink
                  style={{ marginBottom: "3px", marginLeft: "4px" }}
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
