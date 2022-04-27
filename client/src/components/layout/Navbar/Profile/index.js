import { Fragment, useContext, useState } from "react";
import dashContext from "../../../../context/dash/dashContext";
import { BiCaretDown } from "react-icons/bi";
import $ from "jquery";
import Dropdown from "./Dropdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";

// Styling
import "./style.css";

const Profile = ({ drodpownOptions }) => {
  const { user } = useContext(dashContext);
  const [dropdownState, setDropdownState] = useState(true);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    if (dropdownState) {
      setDropdownState(false);
      $(".dropdown-icon").addClass("profile-dropdown-icon-collapsed");
    } else {
      setDropdownState(true);
      $(".dropdown-icon").removeClass("profile-dropdown-icon-collapsed");
    }
  };

  const dropdownOptionClicked = (option) => {
    toggleDropdown();

    if (option.passive) navigate(option.link);
    else window.location.replace(option.link);
  };

  return (
    <Fragment>
      <div className="profile-part">
        {user ? (
          <div id="profile" className="profile" onClick={toggleDropdown}>
            <LazyLoadImage
              effect="opacity"
              id="profile-avatar"
              height="35"
              width="35"
              style={{ borderRadius: "50%", marginRight: "3px" }}
              src={
                user.avatar
                  ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
                  : `/assets/images/default.png`
              }
              alt="Profile"
            />
            <p id="profile-username">{user.username}</p>
            <BiCaretDown className="dropdown-icon" />
          </div>
        ) : (
          <a id="log-btn" className="loginBtn" href="/oauth/login">
            Login
          </a>
        )}
      </div>
      <Dropdown
        options={drodpownOptions}
        disabled={dropdownState}
        optionClicked={dropdownOptionClicked}
      />
    </Fragment>
  );
};

export default Profile;
