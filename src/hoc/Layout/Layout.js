import React, { useState } from "react";
import { connect } from "react-redux";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const layout = (props) => {
  // use array-destructure
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const sideDrawerCloseHandler = () => {
    setSideDrawerIsVisible(false);
  };

  // clean way of setting the STATE when it depends on the old state!
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
    // this.setState((prevState) => {
    //   return { showSideDrawer: !prevState.showSideDrawer };
    // });
  };

  return (
    <Auxiliary>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerCloseHandler}
      />
      <main className={classes.Content}>
        {/* only for class based components, reference with "this." */}
        {props.children}
      </main>
    </Auxiliary>
  );
};
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(layout);
