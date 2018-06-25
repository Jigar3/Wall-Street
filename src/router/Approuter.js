import React from "react";
import { Switch, Route } from "react-router-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import DashboardPage from "../components/DashboardPage";
import BuyPage from "../components/BuyPage";
import NotFoundPage from "../components/NotFoundPage";
import GraphPage from "../components/GraphPage";

const Approuter = () => (
  <Router>
    <div>
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
      </div>
      <div>
        <Switch>
          <Route path="/" component={DashboardPage} exact />
          <Route path="/buy" component={BuyPage} exact />
          <Route path="/graph" component={GraphPage} exact />
          <Route component={NotFoundPage} exact />
        </Switch>
      </div>
    </div>
  </Router>
);

export default Approuter;
