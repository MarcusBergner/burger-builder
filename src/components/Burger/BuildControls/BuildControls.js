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
    <p>
      Current Price: <strong>{props.price.toFixed(2)} €</strong>
    </p>
    {controls.map((crtl) => (
      <BuildControl
        key={crtl.label}
        label={crtl.label}
        added={() => props.ingredientAdded(crtl.type)}
        removed={() => props.ingredientRemoved(crtl.type)}
        disabled={props.disabled[crtl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? " ORDER NOW" : "SING UP TO ORDER"}
    </button>
  </div>
);
export default buildControls;
