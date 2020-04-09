import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

// with <span></span> aloows too use some inline style
// {{}} --> JavaScript-Object: the outrt pair is for marking a dynamic entry and inner pair are the JavaScribt object
class OrderSummary extends Component {
  // componentWillUpdate() {
  //     console.log("componentWillUpdate() -> [OrderSummary] Will-Update");
  // }
  // this could be a funcional component, doesn't have to be a class
  componentDidUpdate() {
    console.log("componentDidUpdate() -> [OrderSummary] Will-Update");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delecious burger with the following ingredients: </p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} € </strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
  }
}
export default OrderSummary;
