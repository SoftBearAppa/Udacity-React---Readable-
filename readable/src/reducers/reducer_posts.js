import _ from 'lodash';

import { FETCH_POSTS, FETCH_CATEGORY_POSTS, FETCH_POST_DETAILS, CREATE_POST, EDIT_POST, VOTE_POST } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case CREATE_POST:
      return {...state, [payload.data.id]: payload.data }

    case EDIT_POST:
      return (payload.data);

    case FETCH_CATEGORY_POSTS:
      return _.mapKeys(payload.data, 'id');

    case FETCH_POSTS:
      return _.mapKeys(payload.data, 'id');

    case FETCH_POST_DETAILS:
      return {[payload.data.id]:payload.data};

    case VOTE_POST:
      return {...state, [payload.data.id]:payload.data};


    default: return state;
  }

} 