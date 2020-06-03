import { put } from "redux-saga/effects";
import axios from "../../axios-orders";
import * as actions from "../actions/index";
export function* initIngredientsSaga() {
  try {
    const response = yield axios.get(
      "https://react-my-burger-6c728.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsFailed());
  }
}
