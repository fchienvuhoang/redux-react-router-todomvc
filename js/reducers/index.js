import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import todos from './todos';

export { todos };
export default combineReducers({
  router: routerStateReducer,
  todos,
});
