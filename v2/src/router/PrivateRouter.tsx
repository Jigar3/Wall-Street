import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Header from "../components/Header"

export default ({component: Component, ...rest}) => (
    <Route {...rest} component={(props) => (
        localStorage.getItem("User_ID") ? (
            <div>
                <Header/>
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/login" />
            )
        )} />
);