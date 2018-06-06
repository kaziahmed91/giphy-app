import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from '../Actions/index';

const initialState = {
    isModalOpen: false,
    isInnerModalOpen: false,
    currentlyViewingGif: '',
}


export default function gifs(state = initialState, action)  {
    switch (action.type) {

        case OPEN_MODAL:
        console.log('payload', action.payload)
            return {
                ...state,
                isModalOpen: true, 
                currentlyViewingGif :  action.payload.gif.imgUrl, 

            }
        
        case CLOSE_MODAL:
            return {
                ...state, 
                isModalOpen: false,
                currentlyViewingGif : '', 
            }
                
        default:{
            return {
                ...state
              }
        }
            
    } 
}