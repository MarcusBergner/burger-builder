import React from 'react';
import Auxiliary from "../../../hoc/Auxiliary";
import Button from '../../UI/Button/Button';

// with <span></span> aloows too use some inline style 
// {{}} --> JavaScript-Object: the outrt pair is for marking a dynamic entry and inner pair are the JavaScribt object
const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map(
        igKey => {
            return (
                <li key={igKey}>
                    <span style={{ textTransform: "capitalize" }}>
                        {igKey}
                    </span>: {props.ingredients[igKey]}
                </li>);
        }
    );
    return (
        < Auxiliary >
            <h3>Your Order</h3>
            <p>A delecious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Auxiliary >
    );
};
export default orderSummary;