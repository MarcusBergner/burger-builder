// don't need enzyme because we're not testing any react components, we don't need to render antything,
// just test normal javascript code, we test functions, the reducer function.
import reducer from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  it("should store the token upon login", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: "some-token",
          userId: "some-user-Id",
        }
      )
    ).toEqual({
      token: "some-token",
      userId: "some-user-Id",
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should remove User-data after actionTypes.AUTH_LOGOUT is called", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_LOGOUT,
          token: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: "/",
    });
  });
  it("should return updateObject after authFail()", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_FAIL,
          error: "some-error",
          token: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: "some-error",
      loading: false,
      authRedirectPath: "/",
    });
  });

  it("should return updateObject after authStart()", () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.AUTH_START,
          error: "some-error",
          token: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: true,
      authRedirectPath: "/",
    });
  });
  it("should return updateObject after setAuthRedirectPath()", () => {
    expect(
      reducer(
        {
          token: "some-token",
          userId: "some-user-id",
          error: null,
          loading: true,
          authRedirectPath: "/",
        },
        {
          type: actionTypes.SET_AUTH_REDIRECT_PATH,
          path: "some-path",

          token: "some-token",
          userId: "some-user-id",
        }
      )
    ).toEqual({
      error: null,
      loading: true,
      token: "some-token",
      userId: "some-user-id",
      authRedirectPath: "some-path",
    });
  });
});
