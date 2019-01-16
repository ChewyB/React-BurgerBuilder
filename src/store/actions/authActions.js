import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_START_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START_FAIL,
        error: error
    }
}

export const auth = (email, password, method) => {
    return dispatch => {
        //...authenticate user
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDcWsn_4PcrTeIrbKCr1D2ozydVRtl75qw';
        if(!method) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDcWsn_4PcrTeIrbKCr1D2ozydVRtl75qw';
        }
        console.log("This is the URL: " + url)
        axios
        .post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
        })
        .catch(err => {
            console.log("This is the error: " + err);
            dispatch(authFail(err));
        })
    }
}