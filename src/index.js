import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./store/reducers/burgerBuilder";

/**
 * connecting our store which is created by redux with our
 * react-app & the React-devtools!
 * Also set the store property on the provider component and
 * pass our created store.
 */
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
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
