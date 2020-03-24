import React, { Component } from "react";
import Auxiliary from "../Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {

    state = {
        showSideDrawer: true
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false });
    }

    // clean way of setting the STATE when it depends on the old state!
    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {

            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (

            <Auxiliary>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerCloseHandler} />
                <main className={classes.Content}>
                    {/* only for class based components, reference with "this." */}
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
};

export default Layout;