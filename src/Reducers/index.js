import { combineReducers } from 'redux'; 
import { routerReducer } from 'react-router-redux';
import gifReducers from './gif';
import authReducers from './auth';
import modalReducers from './modal';
import { reducer as formReducer } from 'redux-form'



const rootReducer = combineReducers({
    gif: gifReducers, 
    modal: modalReducers,
    router: routerReducer,
    form : formReducer, 
    auth: authReducers
})

export default rootReducer; 