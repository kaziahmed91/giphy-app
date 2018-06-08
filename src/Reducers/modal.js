import {
    OPEN_MODAL,
    CLOSE_MODAL,
    OPEN_SEARCH,
    CLOSE_SEARCH
} from '../Actions/index';

const initialState = {
    isModalOpen: false,
    isSearchOpen: false, 
    isInnerModalOpen: false,
    currentlyViewingGif: '',
}


export default function gifs(state = initialState, action)  {
    switch (action.type) {

        case OPEN_MODAL:
            return {
                ...state,
                isModalOpen: true, 
                currentlyViewingGif :  action.payload.gif, 
            }
        
        case CLOSE_MODAL:
            return {
                ...state, 
                isModalOpen: false,
                currentlyViewingGif : '', 
            }

        case OPEN_SEARCH:
            return {
                ...state, 
                isSearchOpen: true
            }

        case CLOSE_SEARCH:
            return {
                ...state,
                isSearchOpen: false
            } 
        default:{
            return {
                ...state
              }
        }
            
    } 
}