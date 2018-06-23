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

const data = {
  company: "INFY",
  quantity: 10,
  buyPrice: 1070,
  currPrice: 1090,
  shareWorth: 10900,
  profitLoss: 200
}

const newData = {
  company: "HDFCBANK",
  quantity: 10,
  buyPrice: 1600,
  currPrice: 1610,
  shareWorth: 16100,
  profitLoss: 100
}

store.dispatch(AddCompany(data));
store.dispatch(AddCompany(newData));
console.log(store.getState());

ReactDOM.render(<App/>, document.getElementById("app"))