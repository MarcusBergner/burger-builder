// this is the root-setup-file for using saga
import { takeEvery } from "redux-saga/effects";
import { logoutSaga } from "./auth";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  //? this will do whenever we exeute this generator, we will basically set up a listener!
  //? ( here between: actionTypes.AUTH_INITIATE_LOGOUT <--> logoutSaga)
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
