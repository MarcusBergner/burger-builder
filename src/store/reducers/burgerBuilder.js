import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

/**
 * @case actionTypes.ADD_INGEDRIENT:
 * returning a new version of the state
 * with the updated ingredients.
 * @case actionTypes.SET_INGREDIENTS:
 *  this is executed whenever we got ingredients from the server,
 *  to initialize our ingredients.
 * note: we could also execute this, set this with any set of ingrediens,
 *  with any javaScript objct representing our ingredients at any point of time we want,
 * for example to reset the current people burger!
 * @param {*} state
 * @param {*} action
 */
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGEDRIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionTypes.REMOVE_INGEDRIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
export default reducer;
