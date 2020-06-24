import React from "react";
import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
/**
 * Wehn using Routing: don't use <a></a> !
 * @activeClassName reference to classes.css
 */
const navigationItem = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);
export default navigationItem;
