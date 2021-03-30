import React from "react";

import "./Navbar.css";
import Image from "../../assets/Github_logo_PNG1.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <React.Fragment>
      <header className="toolbar">
        <nav className="toolbar__navigation">
          <div className="toolbar__logo">
            <Link to="/">
              <img src={Image} alt="git" />
            </Link>
          </div>
          <p>Github Repositories</p>
          <div className="toolbar_navigation-items">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/battle">Battle</Link>
              </li>
              <li>
                <Link to="/">Popular</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
