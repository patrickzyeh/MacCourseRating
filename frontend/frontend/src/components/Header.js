import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/m-icon.png";
import HomeIcon from "./icons/HomeIcon";
import SearchIcon from "./icons/SearchIcon";
import RatingIcon from "./icons/RatingIcon";

function Header() {
  const [homeIconColor, setHomeIconColor] = useState("#808080");
  const [ratingIconColor, setRatingIconColor] = useState("#808080");
  const [searchIconColor, setSearchIconColor] = useState("#808080");

  const [menuOpen, setMenuOpen] = useState(false);

  function hoverHomeIcon() {
    setHomeIconColor("#000000");
  }

  function hoverRatingIcon() {
    setRatingIconColor("#000000");
  }

  function hoverSearchIcon() {
    setSearchIconColor("#000000");
  }
  function outHomeIcon() {
    setHomeIconColor("#808080");
  }
  function outRatingIcon() {
    setRatingIconColor("#808080");
  }

  function outSearchIcon() {
    setSearchIconColor("#808080");
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
          <Link to="/">
            <button className="sign-in-btn">Sign In</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
