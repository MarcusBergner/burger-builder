import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};
// stateful Component, because we add some state's
class BurgerBuilder extends Component {

    //constructor --> old syntax for initizial state's
    // constructor (props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false
    }
    updatePuchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({ purchasable: sum > 0 });
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        // state-update  when a new ingredient is added
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePuchaseState(updatedIngredients);
    }
    // reduce ingredient count -1 and deduct the price
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        // state-update  when a new ingredient is added
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
        this.updatePuchaseState(updatedIngredients);

    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        };
        // create for/in loop -->through all the keys in disableInfo
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        return (
            <Auxiliary>
                <Modal>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice} />
            </Auxiliary>
        );
    }
}
export default BurgerBuilder;  