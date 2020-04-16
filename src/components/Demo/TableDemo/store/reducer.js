// import * as constants from './constants';
import { INIT_LIST } from './constant'
import { PUT_INFO } from './constant'
const defaultState = {
	list: []
	// editItem: {}
}

export default (state = defaultState, action) => {
	// console.log(state, action);
	let list = []
	switch (action.type) {
		case INIT_LIST:
			return {
				...state,
				list: action.list
			}
		case PUT_INFO:
			list = state.list.map((x) => {
				if (x.id === action.data.id) {
					x = action.data
				}
				return x
			})
			return {
				...state,
				list: list
			}
		default:
			return state
	}
}
