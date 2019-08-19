import { combineReducers } from 'redux';

import user from './reducers/userReducer';
import menu from './reducers/menuReducer';
import testReducers from './reducers/testReducers';
import tools from './reducers/toolsReducer';

const rootRedeucer = combineReducers({
  user,
  menu,
  testReducers,
  tools,
});

export default rootRedeucer;