import React from "react";
import { createStore, combineReducers } from "redux";

import Portfolio from "../reducers/Portfolio";
import Money from "../reducers/Money";

const store = createStore(
    combineReducers({
        portfolio: Portfolio,
        money: Money
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

