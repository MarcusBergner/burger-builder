import React from "react";
import classes from "./NavigationItem.css";
import { NavLink } from "react-router-dom";
/**
 * Wehn using Routing: don't use <a></a> !
 */
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.link} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);
export default navigationItem;
