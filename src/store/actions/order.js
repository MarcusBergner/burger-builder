import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

/**
 * This is a Synchronous action creator.
 * @param {*} id
 * @param {*} orderData
 */
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
export const purchaseBurger = (orderData) => {
  return (dispatch) => {
    // the action returned by purchaseBurgerStart is dispatched to the store!
    dispatch(purchaseBurgerStart());

    // send the data to my backend, ".json" -> only a firebase spezial thing for correct work!
    axios
      .post("/orders.json", orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        // console.log(response);
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error));
        // console.log(error);
      });
    // console.log(this.props.ingredients);
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
export const fetchOrders = () => {
  return (dispatch) => {
    dispatch(fetchOrdersStart());
    axios
      .get("/orders.json")
      .then((res) => {
        // change data format
        const fetchOrders = [];
        for (let key in res.data) {
          fetchOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        dispatch(fetchOrdersSuccess(fetchOrders));
      })
      .catch((err) => {
        dispatch(fetchOrdersFail(err));
      });
  };
};
