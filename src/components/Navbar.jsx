import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* Standard Navbar component. Need to add logic to conditionally render Log In
or Log Out, depending on presence of user token or perhaps current user state
*/
const Navbar = (props) => {
  const { updateIsLoggedIn, isLoggedIn } = props;
  return (
    <div style={{ padding: "5px" }}>
      <Link to="/" style={{ padding: "5px" }}>
        Home
      </Link>
      <Link to="/posts" style={{ padding: "5px" }}>
        Posts
      </Link>
      {isLoggedIn && (
        <Link to="/profile" style={{ padding: "5px" }}>
          Profile
        </Link>
      )}

      {isLoggedIn ? (
        <Link
          to="/"
          style={{ padding: "5px" }}
          onClick={(event) => {
            event.preventDefault();
            localStorage.removeItem("strangersThingsToken");
            updateIsLoggedIn(false);
            console.log(isLoggedIn);
          }}
        >
          Log Out
        </Link>
      ) : (
        <Link to="/login" style={{ padding: "5px" }}>
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
