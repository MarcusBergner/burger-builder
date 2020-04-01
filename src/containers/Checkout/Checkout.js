import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };
  /**
   * Extract the query Parameters
   * @returns (Extracting Query-parameters)
   * @yields query.entries() = loop through the different queryParams
   */
  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ["salad", "1"]
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients: ingredients });
  };
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
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
      </div>
    );
  }
}
export default Checkout;
