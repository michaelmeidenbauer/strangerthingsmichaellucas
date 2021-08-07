import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";

/* Standard Navbar component. Need to add logic to conditionally render Log In
or Log Out, depending on presence of user token or perhaps current user state
*/
const NavBar = (props) => {
  const { updateIsLoggedIn, isLoggedIn } = props;

  useEffect(
    () =>
      localStorage.getItem("strangersThingsToken") && updateIsLoggedIn(true),
    []
  );

  return (
    // <Container>
      <Navbar className='content-align-center mx-auto'>
        {/* <Container> */}
          <NavLink href="/">Home</NavLink>
          <NavLink href="/posts">Posts</NavLink>
          {isLoggedIn && <NavLink href="/profile">Profile</NavLink>}

          {isLoggedIn ? (
            <NavLink
              href="/"
              onClick={() => {
                localStorage.removeItem("strangersThingsToken");
                updateIsLoggedIn(false);
              }}
            >
              Log Out
            </NavLink>
          ) : (
            <NavLink href="/login">Log In</NavLink>
          )}
        {/* </Container> */}
      </Navbar>
    // </Container>
  );
};

NavBar.propTypes = {
  updateIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default NavBar;
