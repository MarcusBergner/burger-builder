import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";

// stateful Component, because we add some state's
class BurgerBuilder extends Component {

    //constructor --> old syntax for initizial state's
    // constructor (props){
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 1,
            bacon: 1,
            cheese: 2,
            meat: 2
        }

    }

    render() {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <div>Bild Controls</div>
            </Auxiliary>
        );
    }
}
export default BurgerBuilder;  