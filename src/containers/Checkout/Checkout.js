import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    this.parseParams();
  }

  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  parseParams = () => {
    const urlParams = new URLSearchParams(this.props.location.search);
    const parsedIngredients = {};
    let parsedPrice = 0;
    let key = 0;
    let value = 1;

    for (let params of urlParams.entries()) {
      if (params[key] === "price") {
        parsedPrice = params[value];
      }
      else {
        parsedIngredients[params[key]] = +params[value]; //params[0] is the key, so the name of the ingredient; params[1] is the value, so the amount of ingredients
      }
    }
    this.setState({
      ingredients: parsedIngredients,
      totalPrice: parsedPrice
    });
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkOutCancel={this.checkOutCancelHandler}
          checkOutContinue={this.checkOutContinueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData 
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice}
            {...props}/>
          )}
        />
      </div>
    );
  }
}

export default Checkout;
