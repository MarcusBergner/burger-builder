// action creators for building a burger
import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

/**
 * following that pattern of naming my action creators just as the identifiers,
 * but not all caps with underscores but in camel case!
 */
export const addIngedient = (name) => {
  return {
    type: actionTypes.ADD_INGEDRIENT,
    ingredientName: name,
  };
};
export const removeIngedient = (name) => {
  return {
    type: actionTypes.REMOVE_INGEDRIENT,
    ingredientName: name,
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    typ: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("https://react-my-burger-6c728.firebaseio.com/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => {
        dispatch(fetchIngredientsFailed());
      });
  };
};
