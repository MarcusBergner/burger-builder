import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
const checkout = (props) => {
  /**
   * Extract the query Parameters, bevor
   * @returns (Extracting Query-parameters)
   * @yields query.entries() = loop through the different queryParams
   */
  // componentDidMount = () => {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     // ["salad", "1"]
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price });
  // };

  // componentWillMount() {
  //   this.props.onInitPurchase();
  // }

  /**
   * goes back to the last page.
   * @returns (go to previews page)
   */
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };
  /**
   * want to continue,
   * use replace instead, to replace the current route
   * -> to loads the contactData component.
   * @returns (contactData component)
   */
  const checkoutContinuedHandler = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
          // this render-trick-method for loading contact data
          // render={(props) => (
          //   <ContactData
          //     ingredients={this.props.ings}
          //     price={this.state.totalPrice}
          //     {...props}
          //   />
          // )}
        />
      </div>
    );
  }
  return summary;
};
/**
 * @mapStateToProps has a function which gets the state.
 *  And in the end returns a javascript object where we map, our state stored in redux store
 *  to the props of this container.
 * @state.ingredients Reference: must same name as in reducer.js initialState.ingredients !
 *
 */
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

// /**
//  *
//  * @param {*} dispatch
//  * @returns a map as always, onInitPurchase
//  * note: for working correct, mapDispatchToProps & mapStateToProps must to connect in the connect() funktion !
//  */
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onInitPurchase: () => dispatch(actions.purchaseInit()),
//   };
// };

export default connect(mapStateToProps)(checkout);
