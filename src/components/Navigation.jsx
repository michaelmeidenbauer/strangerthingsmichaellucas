import React, { useEffect } from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import BAC from "../images/BAC.png";

/* Standard Navbar component. Need to add logic to conditionally render Log In
or Log Out, depending on presence of user token or perhaps current user state
*/
const Navigation = (props) => {
  const { updateIsLoggedIn, isLoggedIn } = props;

  useEffect(
    () =>
      localStorage.getItem("strangersThingsToken") && updateIsLoggedIn(true),
    []
  );

  return (
    <Navbar collapseOnSelect expand="sm" bg="light" variant="light">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              // eslint-disable-next-line global-require
              src={BAC}
              alt="logo"
              width="30px"
              height="auto"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer> */}

            <LinkContainer to="/posts">
              <Nav.Link>Posts</Nav.Link>
            </LinkContainer>

            {isLoggedIn && (
              <LinkContainer to="/profile">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
            )}

            {isLoggedIn ? (
              <LinkContainer to="/">
                <Nav.Link
                  onClick={() => {
                    localStorage.removeItem("strangersThingsToken");
                    updateIsLoggedIn(false);
                  }}
                >
                  Log Out
                </Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link href="/login">Log In</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

Navigation.propTypes = {
  updateIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
