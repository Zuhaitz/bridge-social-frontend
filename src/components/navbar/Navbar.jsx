import "./Navbar.scss";

import homeSVG from "../../assets/icons/house-chimney.svg";
import profileSVG from "../../assets/icons/user.svg";

const Navbar = () => {
  return (
    <section className="navbar sidebar">
      <p className="navbar__title">
        So<span className="text__color">cia</span>l Net
        <span className="text__color">work</span>
      </p>

      <div className="navbar__links">
        <a href="/" className="navbar__link">
          <img src={homeSVG} alt="home icon" className="navbar__icon" />
          <p>Home</p>
        </a>

        <a href="/profile" className="navbar__link">
          <img src={profileSVG} alt="profile icon" className="navbar__icon" />
          <p>Profile</p>
        </a>

        <a href="/register" className="navbar__link">
          <img src={profileSVG} alt="register icon" className="navbar__icon" />
          <p>Register</p>
        </a>
      </div>

      <button className="navbar__button">Create post</button>
    </section>
  );
};

export default Navbar;
