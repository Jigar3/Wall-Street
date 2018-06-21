import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DashboardPage from '../components/DashboardPage';
import BuyPage from '../components/BuyPage';
import NotFoundPage from '../components/NotFoundPage';

const Approuter = () => (
    <Switch>  
        <Route path="/" component={DashboardPage} exact />
        <Route path="/buy" component={BuyPage} exact />
        <Route component={NotFoundPage} exact />
    </Switch>
)

export default Approuter;