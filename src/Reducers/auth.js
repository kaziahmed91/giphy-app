import { USER_SIGNOUT ,AUTH_USER, AUTH_ERROR} from '../Actions/index';

const initialState =  {
  authenticated: false, 
  error: null
};

export default function gifs(state = initialState, action) {
    // console.log(action);
  switch (action.type) {
    case AUTH_USER:
    
      return {
        ...state, 
        authenticated: true,
        error: null
      };
    case USER_SIGNOUT:
      return {
        ...state, 
        authenticated: false,
        error: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    default:
      return state;
  }
}
