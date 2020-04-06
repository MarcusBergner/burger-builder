import React from "react";
import classes from "./Input.css";

/**
 * It should basically a wrapper component for normal inputs.
 * A Custom input Component.
 * @param {elementConfig} props Types of InputElements, which define in ContactData.
 * @elementConfig should receive the element config set up for a given input in our ContactData.state!
 * @textarea is a self-closing element in react.
 */
const input = props => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={classes.InputElement} value={props.value}>
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.diplayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
