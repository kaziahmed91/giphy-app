// import request from 'superagent';
import axios from 'axios';
export const START_GIF_SEARCH = 'START_GIF_SEARCH';
export const END_GIF_SEARCH = 'END_GIF_SEARCH';
export const UPDATE_PREV_Y = 'UPDATE_PREV_Y';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const RESET_STATE = 'RESET_STATE';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNOUT = 'USER_SIGNOUT';

// fetch the list of our developers
export function fetchGif(term = null, offset) {
    console.log('fetching offset ', offset)
    const APIKEY = 'OgGHEoEzXuLtmJtdqxM0lynLDFHv6gCe';
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${term}&limit=25&offset=${offset}&rating=R&lang=en`
    return (dispatch) => {
        dispatch(startGifSearch())
        return axios.get(url).then(
            (res) => {
                let gifs = res.data.data
                console.log('term', term)
                dispatch(endGifSearch(gifs, term, offset))
                // dispatch(updatePage())
                // dispatch(updateOffset())
            },
            (err) => {
                console.log(err);
            }
        )

    }
}

export let resetState = () => {
    return {
        type: RESET_STATE
    }
}

export let startGifSearch = () => {
    return {
        type: START_GIF_SEARCH,
    }
}

//action to indicate we have received all our data from the api
export let endGifSearch = (gif, term, offset) => {
    return {
        type: END_GIF_SEARCH,
        payload: {
            gif,
            term,
            offset
        }
    }
}


export let updatePrevY = (prevY) => {
    // console.log('updating prevY to', prevY)
    return {
        type: UPDATE_PREV_Y,
        payload: {
            prevY
        }
    }
}


export function openModal(gif) {
    return {
        type: OPEN_MODAL,
        payload: {
            gif
        }
    }
}

export function closeModal() {
    return {
        type: CLOSE_MODAL
    }
}

export function userSignIn() {
    return {
        type: USER_SIGNIN
    }
}
export function userSignOut() {
    return {
        type: USER_SIGNOUT
    }
}