import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {

    console.log("Token value is: " + token)
    console.log("UserId is: " + userId)
    return {
        type: actionTypes.AUTH_START_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_START_FAIL,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT

    }
}


export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        
            setTimeout(() => {
                dispatch(logout());
            }, expirationTime*1000);
        
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        //...authenticate user
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDcWsn_4PcrTeIrbKCr1D2ozydVRtl75qw';
        if(!isSignUp) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDcWsn_4PcrTeIrbKCr1D2ozydVRtl75qw';
        }
        console.log("This is the URL: " + url)
        axios
        .post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log("This is the error: " + err);
            dispatch(authFail(err.response.data.error));
        })
    }
}