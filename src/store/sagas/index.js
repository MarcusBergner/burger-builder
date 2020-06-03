//! this is the root-setup-file for using saga: -> the goal is:
//! one place you have all the side effects( of events ) and one place where you have all the actions( like events ) and don't mix that!
import { takeEvery, all, takeLatest } from "redux-saga/effects";
import {
  logoutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckStateSaga,
} from "./auth";
import { initIngredientsSaga } from "./burgerBuilder";
import * as actionTypes from "../actions/actionTypes";
import { purchaseBurgerSaga, fetchOrdersSaga } from "./order";
//! note: with takeEvery you can listen to certain actions and do something when they occur!
//! note: with yield you execute something and wait for it to finish!
/**
 * set up various watchers for execute on diffent actions
 */
export function* watchAuth() {
  //?  we exeute this generator(logotSaga), whenever this actionTypes is occur! we will basically set up a event listener!
  //? ( here references between: actionTypes.AUTH_INITIATE_LOGOUT <--> logoutSaga) logoutSaga handles the side effects when AUTH_INITIATE_LOGOUT is detected!
  //! note: all() -> Creates an Effect description that instructs the middleware to run multiple Effects in parallel,
  //! and wait for all of them to complete. It's quite the corresponding API to standard.
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.AUTH_USER, authUserSaga),
    takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga),
  ]);
  // yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  // yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  // yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
  // yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}
//! note: takeLatest() -> will automatically cancel any ongoing executions of purchaseBurgerSaga and always only execute the latest one of them.
export function* watchOrder() {
  yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  // yield takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
