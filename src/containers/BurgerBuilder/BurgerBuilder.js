import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }

  state = {
    // {
    //   salad: 0,
    //   bacon: 0,
    //   cheese: 0,
    //   meat: 0
    // }
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-3c472.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  purgeBurgerHandler = () => {
    const currIngredients = {
      ...this.state.ingredients
    };
    currIngredients["salad"] = 0;
    currIngredients["bacon"] = 0;
    currIngredients["cheese"] = 0;
    currIngredients["meat"] = 0;

    this.setState({
      ingredients: currIngredients,
      totalPrice: 4
    });
  };

  //#region Purchas Handling methods
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.setState({ loading: true });

    const queryParams = [];

    for(let ingredient in this.state.ingredients) {
      queryParams.push(encodeURIComponent(ingredient) + '=' + encodeURIComponent(this.state.ingredients[ingredient]))
    }

    console.log("Processed ingredients for query param " + queryParams);
    
    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryParams
    });
  //   const order = {
  //     ingredients: this.state.ingredients,
  //     price: this.state.totalPrice,
  //     customer: {
  //       name: "Jesus Beltran",
  //       address: {
  //         street: "TestStreet 1",
  //         zipCode: "92122",
  //         country: "MERICA"
  //       },
  //       email: "test@gmail.com"
  //     },
  //     deliveryMethod: "fastest"
  //   };

  //   axios
  //     .post("/orders.json", order)
  //     .then(response => {
  //       this.setState({ loading: false, purchasing: false });
  //     })
  //     .catch(error => {
  //       this.setState({ loading: false, purchasing: false });
  //     });
 };
  //#endregion

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return; //Don't remove anything
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    //console.log(updatedIngredients)
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    //console.log(disabledInfo);
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            purge={this.purgeBurgerHandler}
          />
        </>
      );
      orderSummary = (

          <OrderSummary
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
      
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>

        {burger}

      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
