import { USER_SIGNIN, USER_SIGNOUT } from '../Actions/index';

const initialState =  {
  authenticated: false
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state, authenticated: true
      };
    case USER_SIGNOUT:
      return {
        ...state, authenticated: false
      };
    default:
      return state;
  }
}
