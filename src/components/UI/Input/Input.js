import React from "react";
import classes from "./Input.css";

/**
 * It should basically a wrapper component for normal inputs.
 * @param {inputElement} props Types of InputElements
 * @textarea is a self-closing element in react.
 */
const input = props => {
  let inputElement = null;
  switch (props.inputtype) {
    case "input":
      inputElement = <input className={classes.InputElement} {...props} />;
      break;

    case "textarea":
      inputElement = <textarea className={classes.InputElement} />;
      break;

    default:
      inputElement = <input className={classes.InputElement} />;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
