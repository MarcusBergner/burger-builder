import React, { Component } from "react";
import classes from "./Modal.css";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Backdrop from "../Backdrop/Backdrop";
// import { render } from "react-dom";
// to be a functional Component, it doesn't have any state attached to it,
// just resived some props and returned some jsx for wrapping content 
// now ist a class-based-component which can implemented in other components 

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.show !== this.props.show) {
        //     return true;
        // }
        return nextProps.show !== this.props.show;
    }
    componentDidUpdate() {
        console.log("componentDidUpdate() -> [Modal] Will Update")
    }
    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
                        opacity: this.props.show ? "1" : "0"
                    }}>
                    {this.props.children}
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;
