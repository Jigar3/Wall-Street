import React from "react";
import { createBrowserHistory } from 'history';
import { Switch, Router } from "react-router-dom";

import PublicRoute from "./PublicRouter"
import PrivateRoute from "./PrivateRouter"

import Home from "../components/Home"
import Buy from "../components/Buy"
import View from "../components/View"
import Assets from "../components/Assets"
import SignUp from "../components/Signup"
import LogIn from "../components/LogIn"
import LogOut from "../components/LogOut"
import Leaderboard from "../components/Leaderboard"

export const history = createBrowserHistory();

export default () => (
    <Router history={history}>
        <Switch>
            <PrivateRoute path="/" component={Home} exact/>
            <PrivateRoute path="/buy" component={Buy} exact/>
            <PrivateRoute path="/view" component={View} exact/>
            <PrivateRoute path="/assets" component={Assets} exact/>
            <PublicRoute path="/signup" component={SignUp} exact/>
            <PublicRoute path="/login" component={LogIn} exact/>
            <PrivateRoute path="/logout" component={LogOut} exact/>
            <PrivateRoute path="/leaderboard" component={Leaderboard} exact />
        </Switch>
    </Router>
);