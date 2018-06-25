import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, NavLink } from "react-router-dom";

import Header from "./components/Header";
import store from "./reduxStore/store";
import AppRouter from "./router/Approuter";

import "./styles/styles.scss";
import "../node_modules/normalize.css";

const App = () => (
  <Provider store={store}>
    <div>
      <Header />
      <AppRouter />
    </div>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("app"));
