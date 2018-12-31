import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({component: Component, ...rest}) => (
    <Route {...rest} component={(props) => (
        sessionStorage.getItem("User_ID") ? (
            <Redirect to="/" />
        ) : (
            <Component {...props}/>
            )
        )} />
);