import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import orderReducer from "./store/reducers/order";
import authReducer from "./store/reducers/auth";
import { watchAuth, watchBurgerBuilder } from "./store/sagas/index";

/**
 * @compose allows us to compose our own set of enchancers and middleware
 */
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;
const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer,
});

// ! note: create saga middleware function, to store results, for outsource all side-effects into sagas!
const sagaMiddleware = createSagaMiddleware();

/**
 * connecting our store which is created by redux with our
 * react-app & the React-devtools!
 * Also set the store property on the provider component and
 * pass our created store.
 */
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

// ! note: setting up the watcher right at the start of our application, for listen all the side-effects
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);

/**
 * For activate Routing in app, use BrowserRouter and wrapped!
 * Spezial Import if use Provider.react-redux & BrowserRouter.react-router,
 * making sure that the connect functionality and the routing functionalities work
 * together fine because both implicitly set up some props on the wrapping component,
 * so we have to make sure that everything works!
 */
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
