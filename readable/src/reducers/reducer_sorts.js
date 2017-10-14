import _ from 'lodash';

import { ORDER_BY_TIME, ORDER_BY_VOTES } from '../actions';

const initialState = {
  posts: {
    order: 'byTime'
  },
  comments: {
    order: 'byTime'
  }
}

export default function (state = initialState, action) {
  
  const { topic, order } = action;
  
  switch(action.type) {

    case ORDER_BY_TIME:
      return {
        ...state,
        [topic]: {
          order
        }
      }

    case ORDER_BY_VOTES:
      return {
        ...state,
        [topic]: {
          order
        }
      }

    default:
      return state
  }
}