import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

// stateful Component, because we add some state's
// for testing we need to get access to the component behind the container -> convenient trick "export this class"
export class BurgerBuilder extends Component {
  //constructor --> old syntax for initizial state's
  // constructor (props){
  //     super(props);
  //     this.state = {...}
  // }

  state = {
    purchasing: false,
  };
  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients();
  }
  updatePuchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  /**
   * this method is a redirect SetUp for the user,
   * e.g. if the Button "SING UP TO ORDER" is clicked!
   *
   * @history is comming from react-router package
   */
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      // to make sure "this" inside of this method refers to the class and not to something else!
      this.setState({ purchasing: true });
    } else {
      // use
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    // to make sure "this" inside of this method refers to the class and not to something else!
    this.setState({ purchasing: false });
  };
  /**
   * this is the Place, where i set loading to true,
   *  and where i then place my order,
   *  and send it so the web!
   *  passed as a querry parameter maybe.
   */
  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };
  render() {
    /**
     * @ings reference to mapStateToProps() :ings
     */
    const disableInfo = {
      ...this.props.ings,
    };
    // create for/in loop -->through all the keys in disableInfo
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    // let burger = null;
    // if (this.props.error) {
    //   burger = <p>Ingredients can not load</p>;
    // } else {
    //   burger = <Spinner />;
    // }
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disableInfo}
            purchasable={this.updatePuchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.price}
          />
        </Auxiliary>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngedient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actions.removeIngedient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
/**
 * with that set up we have our burger builder container conected to the store
 */
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
