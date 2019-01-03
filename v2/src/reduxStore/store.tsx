import { createStore, combineReducers } from "redux";

import Portfolio from "../reducers/Portfolio";
import Money from "../reducers/Money";
import Symbols from "../reducers/Symbols";

const store = createStore(
    combineReducers({
        portfolio: Portfolio,
        money: Money,
        symbol: Symbols
    }),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;

