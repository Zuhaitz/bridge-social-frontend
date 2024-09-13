import { Outlet, useNavigate } from "react-router-dom";

import arrowIcon from "../../assets/icons/angle-left.svg";

import "./AuthLayout.scss";

const AuthLayout = () => {
  const navigate = useNavigate();

  const onGoBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <>
      <button onClick={onGoBack} className="goBackBtn">
        <img src={arrowIcon} alt="go back icon" />
        <p>Go back</p>
      </button>
      <Outlet />
    </>
  );
};

export default AuthLayout;
