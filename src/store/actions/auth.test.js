import * as classes from "./auth";
import * as actionTypes from "../actions/actionTypes";

describe("auth actions", () => {
  it("should ...", () => {
    expect(classes.authStart(), {
      type: actionTypes.AUTH_START,
      error: "some-error",
      token: "some-token",
      userId: "some-user-id",
    }).toBeDefined;
  });
});
