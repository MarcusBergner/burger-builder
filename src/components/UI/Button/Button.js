import React from "react";
import classes from "./Button.css";
const button = (props) => (
  <button
    // add an array to assign the button class
    // set classes button as one element of this classes i want to add
    // classes[props.btnType] --> dynamically pull out a certain type
    // call join(" ")--> to have a list of classes which is a string in the end !
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);
export default button;
