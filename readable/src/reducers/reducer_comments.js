import _ from 'lodash';

import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT, FETCH_ALL_COMMENTS, FETCH_COMMENT_DETAILS, VOTE_COMMENT } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case DELETE_COMMENT:
      const filter = state[payload.postsid].filter(comment => comment.id !== payload.commentid);
      return {...state, [payload.postsid]:[...filter]}

    case CREATE_COMMENT:
      return {...state, [payload.postsid]: {...state[payload.postsid], payload}};

    case EDIT_COMMENT:
      const postsState = state[payload.data.parentId];
      const findComment = state[payload.data.parentId].findIndex((comment)=>{return comment.id === payload.data.id});
      postsState[findComment] = payload.data;
      return {...state, [payload.postsid]: [...postsState]};

    case FETCH_ALL_COMMENTS:
      return {...state, [payload.postsid]: payload.data}

    case FETCH_COMMENT_DETAILS:
      return {...state, [payload.postsid]: [...state[payload.postsid], payload.data]};

    case VOTE_COMMENT:
      let newState = state[payload.postsid];
      let index = state[payload.postsid].findIndex((comment) => {return comment.id === payload.data.id});
      newState[index] = payload.data;
      return {...state, [payload.postsid]: [...newState]};

    default: return state;
  }

} 