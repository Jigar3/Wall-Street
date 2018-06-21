import React from "react";
import {  BrowserRouter as Router, NavLink } from "react-router-dom";
import ReactDOM from 'react-dom';

import Header from './components/Header';

import './styles/styles.scss';
import '../node_modules/normalize.css';

const App = () => (
  <Header />
)

ReactDOM.render(<App/>, document.getElementById("app"))