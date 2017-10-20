import _ from 'lodash';

import { DELETE_POST, FETCH_POSTS, FETCH_POST_DETAILS, CREATE_POST, EDIT_POST, VOTE_POST } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case DELETE_POST:
      return _.omit(state, payload);

    case CREATE_POST:
      return {...state, [payload.id]: payload }

    case EDIT_POST:
      return {...state, [payload.id]: payload};

    case FETCH_POSTS:
      return _.mapKeys(payload, 'id');

    case FETCH_POST_DETAILS:
      return {[payload.data.id]:payload.data};

    case VOTE_POST:
      return {...state, [payload.data.id]:payload.data};


    default: return state;
  }

} 