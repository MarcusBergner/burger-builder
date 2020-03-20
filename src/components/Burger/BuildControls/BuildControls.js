import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

// will be a funcional component

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
];


const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(crtl => (
            <BuildControl key={crtl.label} label={crtl.label} />
        ))}
    </div>
);
export default buildControls;