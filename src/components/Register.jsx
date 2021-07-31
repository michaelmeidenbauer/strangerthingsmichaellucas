import React, { useState } from "react";
import { Redirect } from "react-router";
import { registerUser } from "../api/api";


const Register = () => {
  const [userName, updateUserName] = useState(null);
  const [passWord, updatePassWord] = useState(null);
  const [registerFail, updateRegisterFail] = useState(false);
  const [registerSuccess, updateRegisterSuccess] = useState(false);

  const registerSubmitHandler = async (event) => {
    event.preventDefault();
    const registerResponse = await registerUser(userName, passWord);
    console.log(registerResponse);

    if (registerResponse.success) {
      console.log(registerResponse);
      updateRegisterSuccess(true);
      updateRegisterFail(false);
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
        />
        <input
          type="password"
          placeholder="Enter Password"
          onChange={(event) => {
            event.preventDefault();
            updatePassWord(event.target.value);
          }}
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

export default Register;
