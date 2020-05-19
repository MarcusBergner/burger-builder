import React from "react";
// import classes from "./Burger.css";
import classes from "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
  // console.log(props);
  // transform an Object of key value pairs "BurgerBuilder.state" into an Array  of burger ingredients
  // Object.keys() --> extracs keys of a given object returns into an Array: here the keys "strings" without values "numbers" !
  // map() --> executes a function on each element in the input array
  // {igKey + i} --> creates unique key for each ingedient
  // reduce() --> transform an array into something else!
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // console.log("outer map() type: " + igKey);
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        // console.log("inner map() values: " + i);

        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      // take "el" which looping and add it to this "arr" array!
      return arr.concat(el);
    }, []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Pease start adding ingredients!!</p>;
  }
  // console.log(transformedIngredients);
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
/**
 * Notes: if you ever need direct access to match,hisory or location
 *  -> and you don't want to manually pass it from the top level component,
 * you can use withRouter!
 *
 */

export default burger;
