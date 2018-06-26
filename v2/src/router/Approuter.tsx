import React from "react";
import { Switch, Route, BrowserRouter as Router, NavLink } from "react-router-dom";

import Home from "../components/Home"
import Buy from "../components/Buy"

export default () => (
    <Router>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/buy" component={Buy} exact/>
        </Switch>
    </Router>
);