import { AuthContext } from 'context';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import 'styles/App.css';


const Navbar = () => {

  const {isauth, setIsAuth} = useContext(AuthContext);
  
  const logout = () => {
    setIsAuth(false);
    localStorage.removeItem('auth');
  } 

  return (
    <div className="navbar">
      <Button onClick={logout}>
        Logout
      </Button>
    <div className="navbar__links">
{/* "Link" вместо "a" и "to" вместо "href" to prevent page reload*/}
        <Link to="/about">About</Link> 
        <Link to="/posts">Posts</Link>
    </div>
    </div>
  );
};

export default Navbar;