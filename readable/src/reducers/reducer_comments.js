import _ from 'lodash';

import { CREATE_COMMENT, EDIT_COMMENT, FETCH_ALL_COMMENTS, FETCH_COMMENT_DETAILS, VOTE_COMMENT } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case CREATE_COMMENT:
      return {...state, [payload.data.id]:payload.data};

    case EDIT_COMMENT:
      return {...state, [payload.data.id]:payload.data};

    case FETCH_ALL_COMMENTS:
      return _.mapKeys(payload.data, 'id');

    case FETCH_COMMENT_DETAILS:
      return {[payload.data.id]:payload.data};

    case VOTE_COMMENT:
      return {...state, [payload.data.id]:payload.data};

    default: return state;
  }

} 