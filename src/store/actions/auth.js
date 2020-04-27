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
export const logout = () => {
  return { type: actionTypes.AUTH_LOGOUT };
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
      returnSecrureToken: true,
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
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      // Add some code to invalid that Token after one hour, so that then can also update our UI once the Token is no longer there!
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error.response.data.error));
      });
  };
};
