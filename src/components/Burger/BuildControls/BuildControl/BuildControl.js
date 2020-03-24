import React from "react";
import classes from "./BuildControl.css";


// hook up definition for biuld control: --> pass reference("removed, added") which holds that method
//  <div>{}</div> --> allows output dynamically!
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.label}>{props.label}</div>
        <button
            className={classes.Less}
            onClick={props.removed}
            disabled={props.disabled}>Less</button>
        <button
            className={classes.More}
            onClick={props.added}>More</button>

    </div>
);
export default buildControl;