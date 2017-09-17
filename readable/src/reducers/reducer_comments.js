import _ from 'lodash';

import { FETCH_ALL_COMMENTS } from '../actions';

export default function (state = {}, action) {

  const { payload } = action;

  switch (action.type) {

    case FETCH_ALL_COMMENTS:
      return _.mapKeys(payload.data, 'id');

    default: return state;
  }

} 