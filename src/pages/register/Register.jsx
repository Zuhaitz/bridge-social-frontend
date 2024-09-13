import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/auth/authSlice";

import "./Register.scss";

// Ref: https://stackoverflow.com/questions/5658899/can-anyone-tell-me-the-regex-for-excluding-numbers-and-special-characters-in-asp
const regexText = /^[a-zA-Z]*$/;
// Ref: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
const regexEmail = /^\S+@\S+\.\S+$/;
// Ref: https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const Register = () => {
  const initialValue = {
    username: "",
    email: "",
    password: "",
    repeat: "",
  };

  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccess, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      clearState();
      navigate("/login");
    } else if (isError) {
      console.log(message);
    }

    dispatch(reset());
  }, [isSuccess, isError, message]);

  const validateForm = () => {
    const errorList = {};

    const { username, email, password, repeat } = formData;

    if (username.length < 3 || !regexText.test(username))
      errorList.username =
        username.length < 3
          ? "Name must be longer than 2 characters."
          : "Name must not contain numbers or special characters.";

    if (!regexEmail.test(email)) errorList.email = "Introduce a valide email.";

    if (!regexPassword.test(password))
      errorList.password =
        "Password must be 8 digits long, and contain 1 number or letter.";
    else if (password !== repeat) {
      errorList.repeat = "Passwords must be the same.";
    }

    return errorList;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errorList = validateForm();

    if (Object.keys(errorList).length > 0) return setErrors(errorList);
    setErrors({});

    dispatch(register(formData));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const clearState = () => {
    setFormData({ ...initialValue });
    setErrors({});
  };

  return (
    <section className="register">
      <div className="register__container">
        <h1 className="register__title">Create Account</h1>

        <form onSubmit={handleSubmit} className="register__form" noValidate>
          <div className="register__field">
            <div
              className={`register__input ${
                errors.username && "register__input--error"
              }`}
            >
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Name"
                maxLength={20}
                value={formData.username}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <p className="register__error">{errors.username}</p>
          </div>

          <div className="register__field">
            <div
              className={`register__input ${
                errors.email && "register__input--error"
              }`}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <p className="register__error">{errors.email}</p>
          </div>

          <div className="register__field">
            <div
              className={`register__input ${
                errors.password && "register__input--error"
              }`}
            >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <p className="register__error">{errors.password}</p>
          </div>

          <div className="register__field">
            <div
              className={`register__input ${
                errors.repeat && "register__input--error"
              }`}
            >
              <input
                type="password"
                name="repeat"
                id="repeat"
                placeholder="Repeat password"
                value={formData.repeat}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            <p className="register__error">{errors.repeat}</p>
          </div>

          <button type="submit" className="register__button">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
