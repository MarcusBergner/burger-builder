export const ADD_INGEDRIENT = "ADD_INGEDRIENT";
export const REMOVE_INGEDRIENT = "REMOVE_INGEDRIENT";
/**
 * the action Type is dipatched whenever this page is loaded.
 */
export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const FETCH_INGREDIENTS_FAILED = "FETCH_INGREDIENTS_FAILED";

export const PURCHASE_BURGER_START = "PURCHASE_BURGER_START";
export const PURCHASE_BURGER_SUCCESS = "PURCHASE_BURGER_SUCCESS";
export const PURCHASE_BURGER_FAIL = "PURCHASE_BURGER_FAIL";
/**
 * the action Type will be dipatched whenever we load the checkout page
 */
export const PURCHASE_INIT = "PURCHASE_INIT";

/**
 * the action Type will be dipatched whenever we fetch starting the order page
 */
export const FETCH_ORDERS_START = "FETCH_ORDERS_START";
/**
 * the action Type will be dipatched whenever we fetch success the order page
 */
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
/**
 * the action Type will be dipatched whenever we fail fetching the order
 */
export const FETCH_ORDERS_FAIL = "FETCH_ORDERS_FAIL";
/**
 * the action Type will be dipatched when ever the User Authentification starts
 */
export const AUTH_START = "AUTH_START";
/**
 * the action Type will be dipatched when ever the User Authentification was success
 */
export const AUTH_SUCCESS = "AUTH_SUCCESS";
/**
 * the action Type will be dipatched when ever the User Authentification fails
 */
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_CHECK_TIMEOUT = "AUTH_CHECK_TIMEOUT";
/**
 * the action Type will be dipatched when ever the logout detect is executed
 */
export const AUTH_INITIATE_LOGOUT = "AUTH_INITIATE_LOGOUT";

/**
 * the action Type will be dipatched when ever the User Authentification Log-Out
 */
export const AUTH_LOGOUT = "AUTH_LOGOUT";
/**
 * the action Type will be dipatched when ever setting the Authenticated Path
 */
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";
