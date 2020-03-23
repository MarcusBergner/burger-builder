import React from "react";
import classes from "./Modal.css";
// to be a functional Component, it doesn't have any state attached to it,
// just resived some props and returned some jsx for wrapping content 

const modal = (props) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
);

export default modal;
