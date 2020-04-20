// action creators for building a burger
import * as actionTypes from "./actionTypes";

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
