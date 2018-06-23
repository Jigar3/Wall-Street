import { createStore } from 'redux';

import Portfolio from '../Reducer/Portfolio';
import AddCompany from '../Actions/AddCompany';

const store = createStore(Portfolio);

// store.dispatch(SampleAction())
// console.log(store.getState())
export default store;