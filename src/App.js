import React, { useEffect, Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

// ! note: React.lazy() does like the same as the asyncComponent, now i replace it for use React.hooks
const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

// ! important to know: that useEffect() -> runs when ever this component got re-rendered, after and for every comopnent-render-cycle!!
// ! need the second args [] in this case -> it runs ONLY ONCE(after the first render) never after,
// ! because if use not its return an infinit - loop !!
const app = (props) => {
  useEffect(() => {
    props.onTryAutoSignup();
  }, []);

  // setup routing
  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      // ! notes: when setting up the routes you must forward the props
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

//
/**
 * @connect the action-container for use action-Types in this Component
 * @withRouter will enforce your props being passed down to your component still,
 *  therefore react router is back on page know what's getting loaded!
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
