import React from "react";
import { Provider } from "react-redux";
// import { Dispatch as dispatch} from "redux";

import store from "./reduxStore/store";
import AppRouter from "./router/Approuter";
import Refresh from "./actions/Refresh";

const App = () => (
  <Provider store={store}>
      <AppRouter />
  </Provider>
);

// let payload = {
//   index: 0,
//   companyDetails: {
//         company: '',
//         quantity: 0,
//         buyPrice: 0,
//         currPrice: 0,
//         shareWorth: 0,
//         profitLoss: 0
//   }
// }

// setInterval(
//   () => {
//     store.dispatch(Refresh(payload));
//   }, 5000
// )
export default App;
