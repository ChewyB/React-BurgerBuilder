import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
  };

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],//old value + new value
                building: true 
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName], //old value + new value
                building: true
            };
        case actionTypes.SET_INGREDIENTS:
        return {
            ...state,
            ingredients: {
                salad: action.ingredients.salad,
                bacon: action.ingredients.bacon,
                cheese: action.ingredients.cheese,
                meat: action.ingredients.meat,
            },
            totalPrice: 4,
            error: false,
            builing: false
        }
        case actionTypes.FETCH_INGREDIENTS_FAIL:
        return {
            ...state,
            error: true
        }
        default:
            return state;
    }
};

export default reducer;