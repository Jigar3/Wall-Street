import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({component: Component, ...rest}) => (
    <Route {...rest} component={(props) => (
        localStorage.getItem("User_ID") ? (
            <div>
                <Component {...props}/>
            </div>
        ) : (
            <Redirect to="/login" />
            )
        )} />
);