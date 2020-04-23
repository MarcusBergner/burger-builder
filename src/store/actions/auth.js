import * as actionTypes from "./actionTypes";
import axios from "axios";

// set up authenticatation related actions....
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecrureToken: true,
    };
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXfxqB8KKD2hdUxQgU-mrNbMpmXJNm8RI",
        authData
      )
      // success-case, inside then()
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response));
      })
      .catch((error) => {
        console.log(error);
        dispatch(authFail(error));
      });
  };
};
