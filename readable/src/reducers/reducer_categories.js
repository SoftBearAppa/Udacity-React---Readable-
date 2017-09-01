import _ from 'lodash';

import { FETCH_CATEGORIES } from '../actions';

export default function(state={}, action) {

  switch (action.type) {

    case FETCH_CATEGORIES:
      return _.mapKeys(action.payload.data.categories, 'name');

    default: return state;
  }

} 