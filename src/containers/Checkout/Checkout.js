import React, { Component } from "react";
import {Route} from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  componentDidMount() {
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

    for(let params of urlParams.entries()) {
        parsedIngredients[params[0]] = +params[1]; //params[0] is the key, so the name of the ingredient; params[1] is the value, so the amount of ingredients
    }
    this.setState({
        ingredients: parsedIngredients
    })
  };

  render() {

    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkOutCancel={this.checkOutCancelHandler}
          checkOutContinue={this.checkOutContinueHandler}
        />
        <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
      </div>
    );
  }
}

export default Checkout;
