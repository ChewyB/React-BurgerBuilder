import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients);
    console.log("Transformed ingredients: " + transformedIngredients);
    let mappedIngredients = transformedIngredients.map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,index) => {
            console.log("igKey = " + igKey + " and index = " + index)
            return <BurgerIngredient key={igKey+index} type={igKey}/>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    console.log("Mapped ingredients: " + mappedIngredients);
    if(mappedIngredients.length === 0) {
        mappedIngredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            {props.price}
            <BurgerIngredient type="bread-top"/>
            {mappedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;