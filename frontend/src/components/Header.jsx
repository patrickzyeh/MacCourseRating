import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/m-icon.png";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";
import RatingIcon from "./icons/RatingIcon";
import GoogleIcon from "./icons/GoogleIcon";
import { CgProfile } from "react-icons/cg";

function Header({ user }) {
  const [homeIconColor, setHomeIconColor] = useState("#b2b2b2");
  const [ratingIconColor, setRatingIconColor] = useState("#b2b2b2");
  const [searchIconColor, setSearchIconColor] = useState("#b2b2b2");

  const [menuOpen, setMenuOpen] = useState(false);

  function hoverHomeIcon() {
    setHomeIconColor("#ffffff");
  }

  function hoverRatingIcon() {
    setRatingIconColor("#ffffff");
  }

  function hoverSearchIcon() {
    setSearchIconColor("#ffffff");
  }
  function outHomeIcon() {
    setHomeIconColor("#b2b2b2");
  }
  function outRatingIcon() {
    setRatingIconColor("#b2b2b2");
  }

  function outSearchIcon() {
    setSearchIconColor("#b2b2b2");
  }

  return (
    <nav id="nav-bar">
      <Link to="/">
        <img className="m-logo" src={logo} alt="logo" />
      </Link>

      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink onMouseOver={hoverHomeIcon} onMouseOut={outHomeIcon} to="/">
            <HomeIcon color={homeIconColor} />
          </NavLink>
        </li>
        <li>
          <NavLink
            onMouseOver={hoverRatingIcon}
            onMouseOut={outRatingIcon}
            to="/ratings"
          >
            <RatingIcon color={ratingIconColor} />
          </NavLink>
        </li>
        <li>
          <NavLink
            onMouseOver={hoverSearchIcon}
            onMouseOut={outSearchIcon}
            to="/search"
          >
            <SearchIcon color={searchIconColor} />
          </NavLink>
        </li>
        <li>
          {user ? (
            <NavLink to="/dashboard">
              <CgProfile className="profile-icon" />
            </NavLink>
          ) : (
            <Link to="https://course-ratings-backend-4cc685a03b26.herokuapp.com/auth/google">
              <button className="sign-in-btn">
                <p>Sign in with Google </p>
                <GoogleIcon color={"#ffffff"} />
              </button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
