// import request from 'superagent';
import axios from 'axios';
import Firebase from 'firebase';


export const START_GIF_SEARCH = 'START_GIF_SEARCH';
export const END_GIF_SEARCH = 'END_GIF_SEARCH';
export const UPDATE_PREV_Y = 'UPDATE_PREV_Y';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const OPEN_SEARCH = 'OPEN_SEARCH'; 
export const CLOSE_SEARCH = 'CLOSE_SEARCH'; 
export const RESET_STATE = 'RESET_STATE';
export const USER_SIGNIN = 'USER_SIGNIN';
export const USER_SIGNOUT = 'USER_SIGNOUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const LIKE_GIF = 'LIKE_GIF'
export const REORDER_GIF = 'REORDER_GIF'
export const FETCH_FAVORITE_GIFS = 'FETCH_FAVORITE_GIFS'

const config = {
    apiKey: "AIzaSyDgKVW-6_Igj7N7w1-IU1f2JTPQZxCA1Es",
    authDomain: "gify-app.firebaseapp.com",
    databaseURL: "https://gify-app.firebaseio.com",
};


Firebase.initializeApp(config);

// Firebase Authentication actions

export function signUpUser(credentials) {

    return function (dispatch) {
        Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authenticateUser());
            })
            .catch(error => {
                console.log(error);
                dispatch(authenticateError(error));
            });
    }
}


export function signInUser(credentials) {
    return function (dispatch) {
        Firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authenticateUser());
            })
            .catch(error => {
                dispatch(authenticateError(error));
            });
    }
}

export function signOutUser() {
    return (dispatch) => {
        Firebase.auth().signOut().then(() => {
            dispatch({
                type: USER_SIGNOUT
            })
        })
    }
}

export function authenticateUser() {
    
    return {
        type: AUTH_USER
    }
}

export function authenticateError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function userSignIn() {

    return {
        type: USER_SIGNIN
    }
}

export function verifyAuth() {
    
    return function (dispatch) {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                
                dispatch(authenticateUser());
            } else {
                dispatch(signOutUser());
            }
        });
    }
}


// fetch the list of GIF
export function fetchGif(term = null, offset) {
    // console.log(term, offset)
    const APIKEY = 'OgGHEoEzXuLtmJtdqxM0lynLDFHv6gCe';
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&q=${term}&limit=25&offset=${offset}&rating=G&lang=en`
    return (dispatch) => {
        dispatch(startGifSearch())
        return axios.get(url).then(
            (res) => {
                let gifs = res.data.data
                // console.log(gifs)
                dispatch(endGifSearch(gifs, term, offset))
            },
            (err) => {
                console.log(err);
            }
        )
    }
}

export function fetchRandomGif(offset) {
    // console.log('fetching random gif')
    const APIKEY = 'OgGHEoEzXuLtmJtdqxM0lynLDFHv6gCe';
    let url = `https://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}&limit=25&offset=${offset}&rating=R&lang=en`
    return (dispatch) => {
        dispatch(startGifSearch())
        return axios.get(url).then(
            (res) => {
                let gifs = res.data.data
                // console.log(gifs);
                dispatch(endGifSearch(gifs, '', offset))
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

export let reorder = (favorites, direction) => {
    console.log('before order', favorites)
    let sortedFavs =  favorites.sort( (a,b) => {
        let x = a['rating'], y = b['rating']; 
        return direction === 'ASC' ?  (x<y ? -1 : x>y ? 1 : 0) : (x<y ? 1 : x>y ? -1 : 0)
    })
    console.log('after order', sortedFavs);
    return {
        type: REORDER_GIF, 
        payload : {
            favorites : sortedFavs
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
    // console.log('opening ', gif)
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

export function openSearch(gif) {
    console.log(gif)
    return {
        type: OPEN_SEARCH,
    }
}

export function closeSearch() {
    return {
        type: CLOSE_SEARCH
    }
}


// FIREBASE IO ACTIONS

export function likeGif(selectedGif) {
    
    const userId = Firebase.auth().currentUser.uid;
    const gifId = selectedGif.id;

    return dispatch => Firebase.database().ref(userId).update({
        [gifId]: {url: selectedGif.imgUrl, rating:0}
    });
}

export function updateRating(selectedGif, rating) {
    const userId = Firebase.auth().currentUser.uid;
    const gifId = selectedGif.id;
    return dispatch => Firebase.database().ref(userId).update({
        [gifId]: {url: selectedGif.imgUrl, rating}
    });
}

export function unlikeGif(selectedGif) {
    // console.log(selectedGif)
    const userUid = Firebase.auth().currentUser.uid;
    const gifId = selectedGif.id;
    return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
}

export function fetchFavoriteGif() {
    
    const userId = Firebase.auth().currentUser.uid;
    
    let payload = {}; 
    
    return (dispatch) => {
        Firebase.database().ref(userId).on('value', (snapshot) => {
            payload = snapshot.val(); 
            console.log(payload)
            dispatch({ type: FETCH_FAVORITE_GIFS, 
                payload 
            })
        })
    }
    
    
    
}