import React from "react";
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredients = Object.keys(props.ingredients);
    let mappedIngredients = transformedIngredients.map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,index) => {
            return <BurgerIngredient key={igKey+index} type={igKey}/>;
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    //console.log(mappedIngredients);
    if(mappedIngredients.length === 0) {
        mappedIngredients = <p>Please start adding ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            {props.price}
            <BurgerIngredient type="bread-top"/>
            {mappedIngredients}
            {/* <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="meat"/> */}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default burger;