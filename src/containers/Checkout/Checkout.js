import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
//import * as actions from '../../store/actions/index';

class Checkout extends Component {




  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.push("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    
    if (this.props.ings) {
      console.log(this.props.purchased)
      const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkOutCancel={this.checkOutCancelHandler}
            checkOutContinue={this.checkOutContinueHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
