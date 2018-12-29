import React from "react";
import { Provider } from "react-redux";
import axios from "axios"

import store from "./reduxStore/store";
import AppRouter from "./router/Approuter";
import AddCompany from "./actions/Addcompany"
import Set from "./actions/SetMoney"

const App = () => (
  <Provider store={store}>
      <AppRouter />
  </Provider>
);

if(localStorage.getItem("User_ID") !== null) {
  axios.get("http://localhost:3001/state/company", {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
  data.data.map(item => {
    store.dispatch(AddCompany(item))
  })
})

axios.get("http://localhost:3001/state/money", {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
    if(data.data.length == 0) {
      axios.post("http://localhost:3001/state/money", {money: 10000}, {headers: {"x-auth": localStorage.getItem("JWT_Token")}}).then(data => {
      })
    } else {
      store.dispatch(Set(data.data[0].money))
    }
})
}



export {
  App as default
}

