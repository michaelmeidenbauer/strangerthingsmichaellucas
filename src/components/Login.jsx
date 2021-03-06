import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { loginUser, getMyInfo } from "../api/api";
import Register from "./Register";

const Login = (props) => {
  const [userName, updateUsername] = useState(null);
  const [passWord, updatePassword] = useState(null);
  const [loginFail, updateLoginFail] = useState(false);
  const [loginSuccess, updateLoginSuccess] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { updateIsLoggedIn, updateLoggedInName } = props;

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    const loginResult = await loginUser(userName, passWord);
    if (loginResult.success) {
      updateLoginFail(false);
      updateLoginSuccess(true);
      updateIsLoggedIn(true);
      const {
        data: { token },
      } = loginResult;
      const stringToken = JSON.stringify(token);
      if (token) {
        updateIsLoggedIn(true);
        const userInfo = await getMyInfo(token);
        const downloadedUserName = userInfo.data.username;
        updateLoggedInName(downloadedUserName);
      }
      localStorage.setItem("strangersThingsToken", stringToken);
    } else {
      updateLoginSuccess(false);
      updateLoginFail(true);
    }
  };

  return (
    <>
      <Container className="content-align-center mx-auto mt-3 mb-3">
        <h4>Already have an account?</h4>
        <p> Log in here:</p>
        <form onSubmit={loginSubmitHandler}>
          <input
            type="text"
            placeholder="username"
            onChange={(event) => {
              event.preventDefault();
              updateUsername(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(event) => {
              event.preventDefault();
              updatePassword(event.target.value);
            }}
          />
          <button type="submit">Login</button>
          {loginFail && (
            <div className="loginFail">
              <p style={{ color: "red" }}>
                Incorrect username/password. Please try again.
              </p>
            </div>
          )}
          {loginSuccess && <Redirect to="/" />}
        </form>
      </Container>
      <Container className="content-align-center mx-auto mt-3 mb-3">
        <Register updateIsLoggedIn={updateIsLoggedIn} />
      </Container>
    </>
  );
};
Login.propTypes = {
  updateIsLoggedIn: PropTypes.func.isRequired,
  updateLoggedInName: PropTypes.func.isRequired,
};

export default Login;
