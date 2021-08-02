import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Redirect } from "react-router";
import { registerUser } from "../api/api";


const Register = (props) => {
  const [userName, updateUserName] = useState(null);
  const [passWord, updatePassWord] = useState(null);
  const [registerFail, updateRegisterFail] = useState(false);
  const [registerSuccess, updateRegisterSuccess] = useState(false);

  const { updateIsLoggedIn } = props;

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    const registerResponse = await registerUser(userName, passWord);
    console.log(registerResponse);

    if (registerResponse.success) {
      console.log(registerResponse);
      updateRegisterSuccess(true);
      updateRegisterFail(false);
      updateIsLoggedIn(true);
      const {
        data: { token },
      } = registerResponse;
      const stringToken = JSON.stringify(token);
      localStorage.setItem("strangersThingsToken", stringToken);
    } else {
      updateRegisterSuccess(false);
      updateRegisterFail(true);
    }
  };
  return (
    <div>
      <h1>Set up your account</h1>
      <form onSubmit={registerSubmitHandler}>
        <input
          type="text"
          placeholder="Enter User Name"
          onChange={(event) => {
            event.preventDefault();
            updateUserName(event.target.value);
          }}
          minLength='5'
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(event) => {
            event.preventDefault();
            updatePassWord(event.target.value);
          }}
          minLength='5'
          required
        />
        <button type="submit">Register</button>
        {registerFail && (
          <p>Sorry, but that username already exists. Please try again.</p>
        )}
        {registerSuccess && <Redirect to="/" />}
      </form>
    </div>
  );
};

Register.propTypes = {
  updateIsLoggedIn: PropTypes.func.isRequired,
}

export default Register;
