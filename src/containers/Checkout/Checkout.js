import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
class Checkout extends Component {
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
  /**
   * goes back to the last page.
   * @returns (go to previews page)
   */
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  /**
   * want to continue,
   * use replace instead, to replace the current route
   * -> to loads the contactData component.
   * @returns (contactData component)
   */
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
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
  }
}
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
  };
};
export default connect(mapStateToProps)(Checkout);
