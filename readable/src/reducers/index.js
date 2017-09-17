import { combineReducers } from 'redux';
import Categories from './reducer_categories';
import Posts from './reducer_posts';
import Comments from './reducer_comments';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
  categories: Categories,
  posts: Posts,
  comments: Comments,
});

export default rootReducer;