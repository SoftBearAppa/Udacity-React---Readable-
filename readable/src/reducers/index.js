import { combineReducers } from 'redux';
import Categories from './reducer_categories';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  categories: Categories,
});

export default rootReducer;