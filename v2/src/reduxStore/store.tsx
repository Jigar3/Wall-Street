import React from "react";
import { createStore, combineReducers } from "redux";

import Portfolio from "../reducers/Portfolio";
import Money from "../reducers/Money";

const store = createStore(
    combineReducers({
        portfolio: Portfolio,
        money: Money
    })
);

export default store;

