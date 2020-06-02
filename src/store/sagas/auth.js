import { delay } from "redux-saga/effects";
import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
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
