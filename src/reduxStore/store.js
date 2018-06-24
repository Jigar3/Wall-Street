import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Portfolio from '../Reducer/Portfolio';
import Money from '../Reducer/Money';

const store = createStore(
    combineReducers({
      portfolio: Portfolio,
      money: Money
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


// store.dispatch(SampleAction())
// console.log(store.getState())
export default store;