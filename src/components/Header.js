import React from "react";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import AppRouter from "../router/Approuter";

const Header = () => (
  <div>
    <h1 className="title">Wall Street</h1>
    <Router>
      <div>
        <NavLink to="/" activeClassName="selected" exact>
          Home
        </NavLink>
        <NavLink to="/buy" activeClassName="selected">
          Buy
        </NavLink>
        <NavLink to="/graph" activeClassName="selected">
          Graph
        </NavLink>
        <AppRouter />
      </div>
    </Router>
  </div>
);

export default Header;
