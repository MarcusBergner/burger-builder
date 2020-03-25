import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
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
        purchasable: false,
        purchasing: false
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
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchasaeCancelHandler = () => {
        // to make sure "this" inside of this method refers to the class and not to something else!
        this.setState({ purchasing: false });
    }
    purchaseContinueHandler = () => {
        // alert("You continue!");
        // not a setup in real-world() --> prices should definitely calculate on the server-site, for no manipualte !
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
        }
        // send the data to my backend, ".json" -> only a firebase spezial thing for correct work!
        axios.post("/orders.json", order)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });


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
                <Modal show={this.state.purchasing} modalClosed={this.purchasaeCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchasaeCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disableInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Auxiliary>
        );
    }
}
export default BurgerBuilder;  