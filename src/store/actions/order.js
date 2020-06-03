import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";
/**
 * This is a Synchronous action creator.
 * @param {*} id
 * @param {*} orderData
 */
// ``` This is an Action Creator Component for the Order-Case's ```;
export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};
/**
 * This is a Synchronous action creator.
 *
 * @param {*} error
 */
export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};
/**
 * This is a Asynchronous action creator.
 * This action we dispatched from the container once we click that order button.
 */
export const purchaseBurger = (orderData, token) => {
  // return (dispatch) => {
  //   // the action returned by purchaseBurgerStart is dispatched to the store!
  //   dispatch(purchaseBurgerStart());

  //   // send the data to my backend, ".json" -> only a firebase spezial thing for correct work!
  //   axios
  //     .post("/orders.json?auth=" + token, orderData)
  //     .then((response) => {
  //       // console.log(response.data);
  //       dispatch(purchaseBurgerSuccess(response.data.name, orderData));
  //       // console.log(response);
  //     })
  //     .catch((error) => {
  //       dispatch(purchaseBurgerFail(error));
  //       // console.log(error);
  //     });
  //   // console.log(this.props.ingredients);
  // };

  return {
    type: actionTypes.PURCHASE_BURGER,
    orderData: orderData,
    token: token,
  };
};

/**
 * action creator for String-Identifier: PURCHASE_INIT
 */
export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};
export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};
/**
 *
 * @param {*} token
 * @param {*} userId
 */
export const fetchOrders = (token, userId) => {
  return {
    type: actionTypes.FETCH_ORDERS,
    token: token,
    userId: userId,
  };
};
