import React from 'react';
import { Link } from 'react-router-dom';

/* Standard Navbar component. Need to add logic to conditionally render Log In
or Log Out, depending on presence of user token or perhaps current user state
*/
const Navbar = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/posts">Posts</Link>
    <Link to="/profile">Profile</Link>
    <Link to="/login">Log In</Link>
  </div>
);

export default Navbar;
