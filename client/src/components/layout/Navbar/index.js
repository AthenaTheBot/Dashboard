import { Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiMenu, FiExternalLink } from "react-icons/fi";
import $ from "jquery";

// Other Comps
import Profile from "./Profile/";

// Styling
import "./style.css";

const NavbarComp = ({ activeElement }) => {
  const toggleNavbar = () => {
    if ($("#basic-navbar-nav").hasClass("collapse")) {
      $("#basic-navbar-nav").removeClass("collapse");
      $("#basic-navbar-nav").addClass("collapsed");
      $("#basic-navbar-nav").addClass("fadeIn");
      setTimeout(() => {
        $("#basic-navbar-nav").removeClass("fadeIn");
      }, 400);
    } else {
      $("#basic-navbar-nav").removeClass("collapsed");
      $("#basic-navbar-nav").addClass("collapse");
    }
  };

  return (
    <Fragment>
      <div className="athena-navbar">
        <Navbar
          bg="transparent"
          expand="lg"
          collapseOnSelect={true}
          variant="dark"
        >
          <Link className="navbar-brand" to="/">
            <img
              src="/assets/images/logo.png"
              width="64"
              height="64"
              className="d-inline-block align-top"
              alt="Athena"
            />
          </Link>
          <FiMenu className="athena-navbar-toggler" onClick={toggleNavbar} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Link
                className={
                  activeElement === "home" ? "active nav-link" : "nav-link"
                }
                to="/"
              >
                Home
              </Link>
              <Link
                className={
                  activeElement === "commands" ? "active nav-link" : "nav-link"
                }
                to="/commands"
              >
                Commands
              </Link>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className={
                  activeElement === "support" ? "active nav-link" : "nav-link"
                }
                href="/support"
              >
                Support{" "}
                <FiExternalLink
                  style={{ marginBottom: "3px", marginLeft: "4px" }}
                />
              </a>
            </Nav>
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
          </Navbar.Collapse>
        </Navbar>
      </div>
    </Fragment>
  );
};

export default NavbarComp;
