import React, { useState } from "react";
import { connect } from "react-redux";
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
const layout = (props) => {
  // React event-handling are not the same like native Dom-events, basycally react-events replicate the native Dom events!
  // React re-uses event objects!! it create not a new object, it re-use the old one.
  //! note: two importend rules when working with any React-Hook's
  //!       1 -> only use the hooks in functional components, or inside custom hooks!
  //!       2 -> you always have to use the hooks on the root-level in your Component!

  // useState() is a built-in-hook -> allows to manage state and functional components.
  // useState() always returns an array with exactly 2 elements!

  //! Note: Important difference to class-based -state !  -> There, state alwas was an object!
  //! Note: React hooks must be use inside the body of functional components!
  // useState() can be initialize with default state & and that state can be anything
  //?Note: useState() returns always an array with exactly two elements!
  //? first -> current state snapshot for this re - rander - cycle of this component!
  //? second-> function to update current state!
  // array destructuring -> const ["",""] = useState({"",""}) , it must the same amount of element's to extract all of them
  // use array-destructure
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const sideDrawerCloseHandler = () => {
    setSideDrawerIsVisible(false);
  };
  // Note: back ticks ` ` can use for string interpolation to dynamicaly inject values

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
