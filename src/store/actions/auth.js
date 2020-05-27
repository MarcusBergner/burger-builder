import * as actionTypes from "./actionTypes";
import axios from "axios";

// set up authenticatation related actions....
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
/**
 * Function which remove the persistens User-Session-Auth-Object's from the Browser-Local Storage.
 * Which contains the Date's if a user is authenticated!
 * @returns actionTypes.AUTH_LOGOUT
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

/**
 * Check after whatever firebase returns, which will then ensure that the user is logged out!
 * @param {*} expirationTime
 */
export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    // set default url
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXfxqB8KKD2hdUxQgU-mrNbMpmXJNm8RI";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXfxqB8KKD2hdUxQgU-mrNbMpmXJNm8RI";
    }

    axios
      .post(url, authData)
      // success-case, inside then()
      .then((response) => {
        // console.log(response);
        /**
         * @returns current Date plus the expiration time, response expires(in times *1000) because javaScript time works in milliseconds!
         *@getTime() return the current time of the date now!
         */
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        // for persistens the Auth-token for use in across sessions
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      // Add some code to invalid that Token after one hour, so that then can also update our UI once the Token is no longer there!
      .catch((error) => {
        // console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};

/**
 *
 * @param {*} path
 * @returns Authentication-Redirekt-Path
 */
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};
/**
 *i won't receive any arguments here but I will return a function here so that I can dispatch multiple actions,
 @getTime gives us the corret difference in millisecond
 */
export const authCheckState = () => {
  return (dispatch) => {
    // get Token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      // get user expiration time from local storage
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));

        // pass argument: amount of seconds until the user should be logged out!
        dispatch(
          checkAuthTimeout(
            // passing difference between the future date and how many seconds these are and the current date in seconds, => expiry time in seconds!
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
