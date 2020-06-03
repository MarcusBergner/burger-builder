import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions";

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());

  try {
    // send the data to my backend, ".json" -> only a firebase spezial thing for correct work!
    const response = yield axios.post(
      "/orders.json?auth=" + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  // ``` this set up is for FireBase queryParams, to extract the token and userId.
  //! note: for access we should expect them to get them from the action we handle
  const queryParams =
    "?auth=" +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';
  try {
    const response = yield axios.get("/orders.json" + queryParams);
    // change data format
    const fetchOrders = [];
    for (let key in response.data) {
      fetchOrders.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (error) {
    yield put(actions.fetchOrdersFail(error));
  }
}
