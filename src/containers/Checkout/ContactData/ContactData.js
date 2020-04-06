import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
// import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

// import { withRouter } from "react-router-dom";

/**
 * @elementConfig these are the default html attribute names,
 *  important that you use them inside elementConfig the default names!
 */
class ContactData extends Component {
  // TODO create a helper method for initialize it
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "street"
        },
        value: ""
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: ""
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail"
        },
        value: ""
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", diplayValue: "Fastest" },
            { value: "cheapest", diplayValue: "Cheapest" }
          ]
        },
        value: ""
      }
    },
    loading: false
  };
  /**
   * Mehtode to be use on Events.
   * Executed on a Button-Click as a reference.
   * @preventDefault   to prevent the default case,
   *  which i dont't want. (send a request)
   */
  orderHandler = event => {
    event.preventDefault();
    // alert("You continue!");
    this.setState({ loading: true });
    // not a setup in real-world() --> prices should definitely calculate on the server-site, for no manipualte !
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    // send the data to my backend, ".json" -> only a firebase spezial thing for correct work!
    axios
      .post("/orders.json", order)
      .then(response => {
        // console.log(response);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loading: false });
      });
    // console.log(this.props.ingredients);
  };
  /**
   * @for(...) return the property-names of that orderForm Object.
   */
  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}

        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
