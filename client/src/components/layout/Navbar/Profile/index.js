import { Fragment, useContext } from "react";
import dashContext from "../../../../context/dash/dashContext";
import { Link } from "react-router-dom";
import { BiCaretDown } from "react-icons/bi";
import $ from "jquery";

// Styling
import "./style.css";

const Profile = ({ drodpownOptions }) => {
  const { user } = useContext(dashContext);
  let count = 0;

  const toggleDropdown = () => {
    if ($(".dropdown").hasClass("disabled")) {
      $(".dropdown-icon").addClass("profile-dropdown-icon-collapsed");
      $(".dropdown").removeClass("disabled");
    } else {
      $(".dropdown-icon").removeClass("profile-dropdown-icon-collapsed");
      $(".dropdown").addClass("disabled");
    }
  };

  return (
    <Fragment>
      <div className="profile-part">
        {user ? (
          <div id="profile" className="profile" onClick={toggleDropdown}>
            <img
              id="profile-avatar"
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
      <div className="dropdown disabled">
        <ul>
          {drodpownOptions?.map((option) => {
            if (option.reload) {
              return (
                <a key={count++} href={option.url}>
                  <li>{option.content}</li>
                </a>
              );
            } else {
              return (
                <Link key={count++} to={option.url}>
                  <li>{option.content}</li>
                </Link>
              );
            }
          })}
          <a href="/oauth/logout">
            <li>Logout</li>
          </a>
        </ul>
      </div>
    </Fragment>
  );
};

export default Profile;