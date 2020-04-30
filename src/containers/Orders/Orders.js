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
    this.props.onFetchOrders(this.props.token, this.props.userId);
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
    userId: state.auth.userId,
  };
};

/**
 *  map my props to dispatchable functions
 * @param {*} dispatch an action creator
 */
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) => {
      dispatch(actions.fetchOrders(token, userId));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
