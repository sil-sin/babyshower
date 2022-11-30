import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import * as PATHS from "../../utils/paths";

const Navbar = (props) => {
  return (
    <nav className="nav">
      <Link to={PATHS.HOMEPAGE} className="nav__projectName">
        Home
      </Link>
      <img className="llamaimg" src="./llama.png" alt="llama" />
      
       
          <>
            <Link to={PATHS.GIFTS} className="navLink">
              Gifts
            </Link>
            <Link to={''} className="navlink logout" onClick={props.handleLogout}>
              Logout
            </Link>
          </>
        
   
    </nav>
  );
};

export default Navbar;
