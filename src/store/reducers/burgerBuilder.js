import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

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

const addIngredient = (state, action) => {
  // should be a javascript object, where i have that "key-value-pair" for dynamic name of the ingredient and then the updated value which is incremented
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  // should be a javascript object, where i have that "key-value-pair" for dynamic name of the ingredient and then the updated value which is incremented
  const updatedIngredientRemove = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedIngredientsRemove = updateObject(
    state.ingredients,
    updatedIngredientRemove
  );
  const updatedStateRemove = {
    ingredients: updatedIngredientsRemove,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
  };
  return updateObject(state, updatedStateRemove);
};

const setIngredient = (state, action) => {
  return updateObject(state, {
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    totalPrice: 4,
    error: false,
  });
};
const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: true });
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
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGEDRIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};
export default reducer;
