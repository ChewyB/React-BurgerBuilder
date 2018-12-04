import React from "react";
import classes from "./Order.module.css";

const order = props => {
  //console.log(props.ingredients);
  const mappedIngredients = [];
  for (let key in props.ingredients) {
    mappedIngredients.push({
      ingredientName: key,
      amount: props.ingredients[key]
    });
  }
  //console.log(mappedIngredients);

  const finalIngredients = mappedIngredients.map(ig => (
    <span key={ig.ingredientName}
    style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
        }}>
      {ig.ingredientName} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {finalIngredients} </p>
      <p>
        Price: <strong>{props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
