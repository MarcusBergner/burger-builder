import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import reducer from "./burgerBuilder";
describe("burgerBilder reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      ingredients: null,
      totalPrice: 4,
      error: false,
      building: false,
    });
  });

  it("should return the updateObject when addIngredient is called", () => {
    expect(
      reducer(
        {
          ingredients: { undefined: NaN },
          totalPrice: 4,
          error: false,
          building: false,
        },
        {
          type: actionTypes.ADD_INGEDRIENT,
          ingredients: { undefined: NaN },
        }
      )
    ).toEqual({
      error: false,
      ingredients: { undefined: NaN },

      building: true,
      totalPrice: NaN,
    });
  });
  it("should return the updateObject when removeIngredient is called", () => {
    expect(
      reducer(
        {
          ingredients: { undefined: NaN },
          totalPrice: 4,
          error: false,
          building: false,
        },
        {
          type: actionTypes.REMOVE_INGEDRIENT,
          ingredients: { undefined: NaN },
        }
      )
    ).toEqual({
      error: false,
      ingredients: { undefined: NaN },

      building: true,
      totalPrice: NaN,
    });
  });
  it("should return the updateObject when setIngredient is called", () => {
    expect(
      reducer(
        {
          ingredients: null,
          totalPrice: 4,
          error: false,
          building: false,
        },
        {
          type: actionTypes.SET_INGREDIENTS,
          ingredients: {
            undefined: NaN,
            salad: NaN,
            bacon: NaN,
            cheese: NaN,
            meat: NaN,
          },
        }
      )
    ).toEqual({
      error: false,
      ingredients: {
        salad: NaN,
        bacon: NaN,
        cheese: NaN,
        meat: NaN,
      },
      error: false,

      building: false,
      totalPrice: 4,
    });
  });
  it("should return the updateObject when fetchIngredientsFailed is called", () => {
    expect(
      reducer(
        {
          ingredients: { undefined: NaN },
          totalPrice: 4,
          error: false,
          building: false,
        },
        {
          type: actionTypes.FETCH_INGREDIENTS_FAILED,
          ingredients: { undefined: NaN },
        }
      )
    ).toEqual({
      error: true,
      ingredients: { undefined: NaN },

      building: false,
      totalPrice: 4,
    });
  });

  //   it("should return an update Object after addIngedient() is call", () => {
  //     expect(
  //       reducer(
  //         {
  //           ingredients: null,
  //           totalPrice: 4,
  //           error: false,
  //           building: false,
  //         },
  //         {
  //           type: actionTypes.ADD_INGEDRIENT,
  //           ingredients: updateObject.ingredients,
  //           totalPrice: "some-totalPrice",
  //           building: true,
  //         }
  //       )
  //     ).toEqual({
  //       ingredients: updateObject.ingredients,
  //       totalPrice: "some-totalPrice",
  //       error: false,
  //       building: true,
  //     });
  //   });
});
