import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import App from './App';
import Category from './components/category';
import Nav from './components/nav';
import PostDetails from './components/posts_details';
import CreateComment from './components/create_comment';
import CreatePost from './components/create_post';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(promise, thunk))(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <BrowserRouter>
      <div>
        <Nav />
        <Switch>
          <Route exact path='/posts/new' component={CreatePost} />
          <Route exact path='/posts/edit/:postsid' component={CreatePost} />
          <Route exact path='/posts/:postsid/comments/new' component={CreateComment} />
          <Route exact path='/posts/:postsid/comments/edit/:commentsid' component={CreateComment} />
          <Route exact path='/posts/:postsid' component= {PostDetails} />
          <Route exact path='/category/:cats' component= {Category} />
          <Route exact path='/' component= {App} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
