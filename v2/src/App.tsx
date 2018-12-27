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

axios.get("http://localhost:3001/state/company").then(data => {
  console.log(data.data)
  data.data.map(item => {
    store.dispatch(AddCompany(item))
  })
})

axios.get("http://localhost:3001/state/money").then(data => {
  console.log(data.data)
    store.dispatch(Set(data.data[0].money)) 
})


export default App;
