import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../redux/auth/authSlice";

import homeIcon from "../../assets/icons/house-chimney.svg";
import homeFillIcon from "../../assets/icons/house-chimney-fill.svg";
import profileIcon from "../../assets/icons/user.svg";
import profileFillIcon from "../../assets/icons/user-fill.svg";
import logoutIcon from "../../assets/icons/sign-out-alt.svg";
import "./Navbar.scss";

const Navbar = ({ setPosting }) => {
  // const { token } = useSelector((state) => state.auth);
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) navigate("/login");
    else if (isError) console.log(message);

    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  };

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
              src={location.pathname === "/" ? homeFillIcon : homeIcon}
              alt="home icon"
              className="navbar__icon"
            />
            <p>Home</p>
          </a>

          {token ? (
            <>
              <a href={`/profile/${user._id}`} className="navbar__link">
                <img
                  src={
                    location.pathname === `/profile/${user._id}`
                      ? profileFillIcon
                      : profileIcon
                  }
                  alt="profile icon"
                  className="navbar__icon"
                />
                <p>Profile</p>
              </a>

              <a href="" onClick={onLogout} className="navbar__link">
                <img
                  src={logoutIcon}
                  alt="logout icon"
                  className="navbar__icon"
                />
                <p>Logout</p>
              </a>
            </>
          ) : (
            <>
              <a href="/register" className="navbar__link">
                <img
                  src={profileIcon}
                  alt="register icon"
                  className="navbar__icon"
                />
                <p>Register</p>
              </a>

              <a href="/login" className="navbar__link">
                <img
                  src={profileIcon}
                  alt="login icon"
                  className="navbar__icon"
                />
                <p>Login</p>
              </a>
            </>
          )}
        </div>

        {token && (
          <button onClick={() => setPosting(true)} className="navbar__button">
            Create post
          </button>
        )}
      </div>
    </section>
  );
};

export default Navbar;
