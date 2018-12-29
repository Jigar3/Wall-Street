import React from "react";
import { Provider } from "react-redux";

import store from "./reduxStore/store";
import AppRouter from "./router/Approuter";
import { getInitialValue } from "./utils/utils"

class App extends React.Component {

  state = {
    once: false
  }

  componentDidMount() {
    this.handleOnce()
  }

  handleOnce = () => {
    if(!this.state.once) {
      getInitialValue()
      this.setState({once: true})
    }
  }

  render() {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
      )
  }
}
  
export {
  App as default
}

