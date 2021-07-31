import React from 'react';
import { Link } from 'react-router-dom';

/* Standard Navbar component. Need to add logic to conditionally render Log In
or Log Out, depending on presence of user token or perhaps current user state
*/
const Navbar = () => (
  <div style={{padding: '5px'}}>
    <Link to="/" style={{padding: '5px'}}>Home</Link>
    <Link to="/posts" style={{padding: '5px'}}>Posts</Link>
    <Link to="/profile" style={{padding: '5px'}}>Profile</Link>
    <Link to="/login" style={{padding: '5px'}}>Log In</Link>
  </div>
);

export default Navbar;
