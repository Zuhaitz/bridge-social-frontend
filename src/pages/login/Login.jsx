import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Login.scss";

const Login = () => {
  const initialValue = {
    name: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const errorList = {};
    const { name, password } = formData;

    if (name.length === 0) errorList.name = "Fill username field.";
    if (password.length === 0) errorList.password = "Fill password field.";

    return errorList;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorList = validateForm();
    if (Object.keys(errorList).length > 0) return setErrors(errorList);
    setErrors({});

    try {
      // await login(formData);

      clearState();
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoginError(error.response.data.message);
    }
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
            <label htmlFor="name" className="login__fieldLabel">
              Username:
            </label>
            <div
              className={`login__input ${errors.name && "login__input--error"}`}
            >
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
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
