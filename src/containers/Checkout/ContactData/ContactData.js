import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
// import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    loading: false
  };
  /**
   * Mehtode to be use on Events.
   * Executed on a Button-Click as a reference.
   * @preventDefault   to prevent the default
   *  which i dont't want. (send a request)
   */
  orderHandler = event => {
    event.preventDefault();
    // alert("You continue!");
    this.setState({ loading: true });
    // not a setup in real-world() --> prices should definitely calculate on the server-site, for no manipualte !
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Marcus",
        adress: {
          street: "Am Hamburger Bahnhof 4",
          zipCode: "10557",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
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
  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Your postalCode"
        />
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
