import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  componentWillMount() {
    // we need to make sure that we have the toke when we call that onFetchOrders()!!
    this.props.onFetchOrders(this.props.token);
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
    }

    return <div>{orders}</div>;
  }
}
/**
 * I do map slices of the state to props
 */
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

/**
 *  map my props to dispatchable functions
 * @param {*} dispatch
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => {
      dispatch(actions.fetchOrders(token));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
