import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* Standard Navbar component. Need to add logic to conditionally render Log In
or Log Out, depending on presence of user token or perhaps current user state
*/

const smallPadding = { padding: "5px" };

const Navbar = ({ updateIsLoggedIn, isLoggedIn }) => {
  const onLogOutClick = () => {
    localStorage.removeItem("strangersThingsToken");
    updateIsLoggedIn(false);
  };

  return (
    <div style={smallPadding}>
      <Link to="/" style={smallPadding}>
        Home
      </Link>
      <Link to="/posts" style={smallPadding}>
        Posts
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/profile" style={smallPadding}>
            Profile
          </Link>
          <Link to="/" style={smallPadding} onClick={onLogOutClick}>
            Log Out
          </Link>
        </>
      ) : (
        <Link to="/login" style={smallPadding}>
          Log In
        </Link>
      )}
    </div>
  );
};

Navbar.propTypes = {
  updateIsLoggedIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navbar;
