import {
  TOGGLE_LEFT_SIDE_COLLAPSE
} from './constant'

const defaultState = {
  leftSideCollapsed: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_LEFT_SIDE_COLLAPSE:
      return {
        ...state,
        leftSideCollapsed: !state.leftSideCollapsed
      }
    default:
      return state
  }
}
