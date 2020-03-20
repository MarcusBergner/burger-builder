import React from "react";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
    // transform an Object of key value pairs "BurgerBuilder.state" into an Array  of burger ingredients
    // Object.keys() --> extracs keys of a given object returns into an Array: here the keys "strings" without values "numbers" !
    // map() --> executes a function on each element in the input array
    // {igKey + i} --> creates unique key for each ingedient 
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            console.log("outer map() type: " + igKey);
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                console.log("inner map() values: " + i);

                return <BurgerIngredient key={igKey + i} type={igKey} />;
            });
        });
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};
export default burger;