import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => (
  <div id="navbarResponsive">
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <img src="https://png.icons8.com/ultraviolet/50/000000/shekel.png" />
      <a className="navbar-brand" href="/">
        WALL STREET
      </a>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink to="/" activeClassName="active" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/buy" activeClassName="active" className="nav-link">
              Buy
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/graph"
              activeClassName="active"
              className="nav-link"
              style={{ paddingRight: "25px" }}
            >
              Graph
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Header;
