import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import axios from "axios";

// ! functions with the star at the end "*", turning this function into an "Generator".
// ! it's are next genartion javascript feature which are functions which can be executed incrementally.
// ! you can kind of call them and they don't run from start to end immendiately but you can parse during function execution.
// ! e.g. to wait dfor asynchronous code to finish, and that is exactly what redux-saga takes!

export function* logoutSaga(action) {
  // ! Note: yield keyword -> marker this step to be execute, then it will wait for it to finish
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(
    // ? we should probably also use an action creator here and not instead of hard coding action-object here
    actions.logoutSucceed()
  );
}
/**
 * function for handle Side-Effects in Saga. here to wait for the token expire and then logout action code in a saga style
 */
export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  // to get this action this deipatches
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  // set default url
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXfxqB8KKD2hdUxQgU-mrNbMpmXJNm8RI";
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXfxqB8KKD2hdUxQgU-mrNbMpmXJNm8RI";
  }
  try {
    const response = yield axios.post(url, authData);
    // success-case, inside then()
    // console.log(response);
    /**
     * @returns current Date plus the expiration time, response expires(in times *1000) because javaScript time works in milliseconds!
     *@getTime() return the current time of the date now!
     */
    const expirationDate = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    // for persistens the Auth-token for use in across sessions
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    // Add some code to invalid that Token after one hour, so that then can also update our UI once the Token is no longer there!
    // console.log(error);
    yield put(actions.authFail(error.response.data.error));
  }
}
