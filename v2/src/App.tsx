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

let id;

axios.get("http://localhost:3001/state/company").then(data => {
  data.data.map(item => {
    store.dispatch(AddCompany(item))
  })
})

axios.get("http://localhost:3001/state/money").then(data => {
    if(data.data.length == 0) {
      axios.post("http://localhost:3001/state/money", {money: 10000}).then(data => {
        id = data.data._id
      })
    } else {
      store.dispatch(Set(data.data[0].money))
      id = data.data[0]._id
    }
})



export {
  App as default,
  id
}

