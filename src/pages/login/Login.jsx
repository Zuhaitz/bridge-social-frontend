import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/authSlice";

import "./Login.scss";

const Login = () => {
  const initialValue = {
    user: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateForm = () => {
    const errorList = {};
    const { user, password } = formData;

    if (user.length === 0) errorList.user = "Fill username field.";
    if (password.length === 0) errorList.password = "Fill password field.";

    return errorList;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorList = validateForm();
    if (Object.keys(errorList).length > 0) return setErrors(errorList);
    setErrors({});
    dispatch(login(formData)).then((res) => {
      if (res.error) setLoginError(res.error.message);
      else {
        clearState();
        navigate("/");
      }
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearState = () => {
    setFormData({ ...initialValue });
    setErrors({});
    setLoginError("");
  };

  return (
    <section className="login">
      <div className="login__container">
        <h1 className="login__title">Login</h1>

        <div className="login__error">
          <p>{loginError}</p>
        </div>

        <form onSubmit={handleSubmit} className="login__form" noValidate>
          <div className="login__field">
            <label htmlFor="user" className="login__fieldLabel">
              Username or Email:
            </label>
            <div
              className={`login__input ${errors.user && "login__input--error"}`}
            >
              <input
                type="text"
                name="user"
                id="user"
                value={formData.user}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="login__field">
            <label htmlFor="password" className="login__fieldLabel">
              Password:
            </label>
            <div
              className={`login__input ${
                errors.password && "login__input--error"
              }`}
            >
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
          </div>

          <button type="submit" className="login__button">
            Login
          </button>
        </form>

        <p className="login__signUp">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
