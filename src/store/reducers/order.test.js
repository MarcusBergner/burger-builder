import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import reducer from "./order";

describe("order reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      orders: [],
      loading: false,
      purchased: false,
    });
  });

  it("should return updateObject after purchaseInit is called", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.PURCHASE_INIT,
          purchased: false,
        }
      )
    ).toEqual({ orders: [], loading: false, purchased: false });
  });
  it("should return updateObject after purchaseBurgerStart is called", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.PURCHASE_BURGER_START,
          purchased: false,
        }
      )
    ).toEqual({ orders: [], loading: true, purchased: false });
  });
  it("should return updateObject after purchaseBurgerSuccess is called", () => {
    expect(
      reducer(
        {
          orders: [],
          loading: false,
          purchased: false,
        },
        {
          type: actionTypes.PURCHASE_BURGER_SUCCESS,
          purchased: true,
          loading: false,
        }
      )
    ).toEqual({ orders: [{ id: undefined }], loading: false, purchased: true });
  });
  it("should return updateObject after purchaseBurgerFail is called", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.PURCHASE_BURGER_FAIL,
        }
      )
    ).toEqual({ orders: [], loading: false, purchased: false });
  });

  it("should return updateObject after fetchOrdersStart is called", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.FETCH_ORDERS_START,
          purchased: false,
        }
      )
    ).toEqual({ orders: [], loading: true, purchased: false });
  });

  it("should return updateObject after fetchOrdersSuccess is called", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.FETCH_ORDERS_SUCCESS,
          purchased: false,
        }
      )
    ).toEqual({ orders: undefined, loading: false, purchased: false });
  });

  it("should return updateObject after fetchOrdersFail is called", () => {
    expect(
      reducer(
        { orders: [], loading: false, purchased: false },
        {
          type: actionTypes.FETCH_ORDERS_FAIL,
        }
      )
    ).toEqual({ orders: [], loading: false, purchased: false });
  });
});
