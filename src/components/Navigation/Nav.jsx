import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav">
      
        <li className="navLink">
          <Link to={"./"}>Home</Link>
        </li>
        <img className="llamaimg" src="./llama.png" alt="llama"/>
        <li className="navLink">
          <Link to={"./gift-list"}>Gifts</Link>
        </li>
    
    </div>
  );
}
