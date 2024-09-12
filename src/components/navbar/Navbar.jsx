import { useLocation } from "react-router-dom";

import homeSVG from "../../assets/icons/house-chimney.svg";
import homeFillSVG from "../../assets/icons/house-chimney-fill.svg";
import profileSVG from "../../assets/icons/user.svg";
import profileFillSVG from "../../assets/icons/user-fill.svg";
import "./Navbar.scss";

const Navbar = () => {
  let location = useLocation();

  return (
    <section className="navbar sidebar">
      <div>
        <p className="navbar__title">
          So<span className="text__color">cia</span>l Net
          <span className="text__color">work</span>
        </p>

        <div className="navbar__links">
          <a href="/" className="navbar__link">
            <img
              src={location.pathname === "/" ? homeFillSVG : homeSVG}
              alt="home icon"
              className="navbar__icon"
            />
            <p>Home</p>
          </a>

          <a href="/profile" className="navbar__link">
            <img
              src={
                location.pathname === "/profile" ? profileFillSVG : profileSVG
              }
              alt="profile icon"
              className="navbar__icon"
            />
            <p>Profile</p>
          </a>

          <a href="/register" className="navbar__link">
            <img
              src={profileSVG}
              alt="register icon"
              className="navbar__icon"
            />
            <p>Register</p>
          </a>

          <a href="/login" className="navbar__link">
            <img src={profileSVG} alt="login icon" className="navbar__icon" />
            <p>Login</p>
          </a>
        </div>

        <button className="navbar__button">Create post</button>
      </div>
    </section>
  );
};

export default Navbar;
