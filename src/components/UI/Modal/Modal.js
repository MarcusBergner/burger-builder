import React from "react";
import classes from "./Modal.css";
import Auxiliary from "../../../hoc/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
// to be a functional Component, it doesn't have any state attached to it,
// just resived some props and returned some jsx for wrapping content 

const modal = (props) => (
    <Auxiliary>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div
            className={classes.Modal}
            style={{
                transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                opacity: props.show ? "1" : "0"
            }}>
            {props.children}
        </div>
    </Auxiliary>
);

export default modal;
