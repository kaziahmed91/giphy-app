import {
	START_GIF_SEARCH,
	END_GIF_SEARCH, 
	UPDATE_PREV_Y, RESET_STATE, 
} from '../Actions/index';

const initialState = {
	data: [],
	isFetching: false, 
	term: '',
	page: 1,
	loading: false,
	offset: 0,
	prevY: 0,
};


export default function gifs(state = initialState, action) {
	// console.log('reducer action', action)
	switch (action.type) {
		case START_GIF_SEARCH:
			console.log('starting search', state)
			return {
				...state,
				isFetching: true
			}
			// break;

		case END_GIF_SEARCH:
			console.log([...state.data, ...action.payload.gif]);
			return {
				...state,
				data:[...state.data, ...action.payload.gif], 
				term: action.payload.term,
				isFetching: false,
				page: state.page + 1,
				offset: (state.page + 1 ) * 25 
			};
			// break;

		case UPDATE_PREV_Y: 
		// console.log('update prevY', state.prevY, action.payload.prevY)
			return {
				...state, 
				prevY: action.payload.prevY
			}
			// break;
		case RESET_STATE: 
			return {
				...initialState
			}
			// break;

		default: {
			return {
			  ...state
			}
		}
	}
}