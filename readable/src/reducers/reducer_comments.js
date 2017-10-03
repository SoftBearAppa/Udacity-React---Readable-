import _ from 'lodash';

import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, FETCH_ALL_COMMENTS, FETCH_COMMENT_DETAILS, VOTE_COMMENT } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case DELETE_COMMENT:
    console.log(state[payload.postsid]);
      const filter = state[payload.postsid].filter(comment => comment.id !== payload.commentid);
      return {...state, [payload.postsid]:[...filter]}

    case CREATE_COMMENT:
      return {...state, [payload.data.id]:payload.data};

    case EDIT_COMMENT:
      return {...state, [payload.data.id]:payload.data};

    case FETCH_ALL_COMMENTS:
      return {...state, [payload.postsid]: payload.data}

    case FETCH_COMMENT_DETAILS:
      return {[payload.data.id]:payload.data};

    case VOTE_COMMENT:
      return {...state, [payload.data.id]:payload.data};

    default: return state;
  }

} 