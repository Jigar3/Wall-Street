import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./reduxStore/store";
import AppRouter from "./router/Approuter";

import "./styles/styles.scss";
import "../node_modules/normalize.css";

const App = () => (
  <Provider store={store}>
    <div>
      <AppRouter />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
