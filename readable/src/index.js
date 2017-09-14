import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import App from './App';
import Category from './components/category';
import PostDetails from './components/posts_details';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const createStoreWithMiddleware = composeEnhancers(applyMiddleware(promise, thunk))(createStore);



ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducer)}>
    <BrowserRouter>
      <div>
        <Route exact path='/posts/:postsid' component={PostDetails} />
        <Route exact path='/category/:cats' component={Category} />
        <Route exact path='/' component={App} />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
