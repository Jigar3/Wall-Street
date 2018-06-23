import React from "react";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Header from './components/Header';
import store from './reduxStore/store'
import AddCompany from './Actions/AddCompany';

import './styles/styles.scss';
import '../node_modules/normalize.css';

const App = () => (
  <Provider store={store}>
    <Header />
  </Provider>
)

// store.dispatch(AddCompany({
//   company: "GOOG",
//   quantity: 10,
//   buyPrice: 100,
//   currPrice: 100,
//   shareWorth: 1000,
//   profitLoss: 0
// }))

ReactDOM.render(<App/>, document.getElementById("app"))