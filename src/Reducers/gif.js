import {
	START_GIF_SEARCH,
	END_GIF_SEARCH, 
	UPDATE_PREV_Y, RESET_STATE, LIKE_GIF, 
	FETCH_FAVORITE_GIFS, REORDER_GIF
} from '../Actions/index';

const initialState = {
	data: [],
	favorites: [], 
	isFetching: false, 
	term: '',
	page: 1,
	loading: false,
	offset: 0,
	prevY: 0,
};


export default function gifs(state = initialState, action) {
	
	switch (action.type) {
		case START_GIF_SEARCH:
			return {
				...state,
				isFetching: true
			}
		case END_GIF_SEARCH:
			return {
				...state,
				data:[...state.data, ...action.payload.gif], 
				term: action.payload.term,
				isFetching: false,
				page: state.page + 1,
				offset: (state.page + 1 ) * 25 
			};
			
		case UPDATE_PREV_Y: 
			return {
				...state, 
				prevY: action.payload.prevY
			}

		case FETCH_FAVORITE_GIFS:
			let favorites = []
			
			for (let i in action.payload ) {
				if (action.payload.hasOwnProperty(i)) {
					favorites.push({id : i , img: action.payload[i].url, rating: action.payload[i].rating})
				}
			}
		
			return {
				...state, 
				favorites
			}
		
		case RESET_STATE: 
			return {
				...initialState
			}

		case LIKE_GIF: 
			return {
				...state
			}
		case REORDER_GIF:
		// console.log(action.payload.favorites)
			return {
				...state,
			favorites: action.payload.favorites
			}	
		default: {
			return {
			  ...state
			}
		}
	}
}