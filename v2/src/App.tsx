import React from "react";
import { Provider } from "react-redux";

import store from "./reduxStore/store";
import AppRouter from "./router/Approuter";

const App = () => (
  <Provider store={store}>
      <AppRouter />
  </Provider>
);

export default App;
