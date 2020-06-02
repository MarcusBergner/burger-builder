// this is the root-setup-file for using saga
import { takeEvery } from "redux-saga/effects";
import { logoutSaga } from "./auth";
import * as actionTypes from "../actions/actionTypes";
//! note: with takeEvery you can listen to certain actions and do something when they occur!
//! note: with yield you execute something and wait for it to finish!
export function* watchAuth() {
  //?  we exeute this generator(logotSaga), whenever this actionTypes is occur! we will basically set up a listener!
  //? ( here references between: actionTypes.AUTH_INITIATE_LOGOUT <--> logoutSaga)
  //?
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
