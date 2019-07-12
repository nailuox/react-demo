import moment from 'moment'

import {
  REFRESH_TIME
} from './constant'

const defaultState = {
  time: moment().format('YYYY-MM-DD HH:mm:ss')
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REFRESH_TIME:
      return {
        ...state,
        time: moment().format('YYYY-MM-DD HH:mm:ss')
      }
    default:
      return state
  }
}
