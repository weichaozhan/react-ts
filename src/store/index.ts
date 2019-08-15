import { combineReducers } from 'redux';

import menu from './reducers/menuReduser';
import testReducers from './reducers/testReducers';

const rootRedeucer = combineReducers({
  menu,
  testReducers,
});

export default rootRedeucer;