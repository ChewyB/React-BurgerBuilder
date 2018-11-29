import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {


    state = {
        ingredients : {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        }
    }

    checkOutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkOutContinueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients = {this.state.ingredients}
                checkOutCancel = {this.checkOutCancelHandler}
                checkOutContinue = {this.checkOutContinueHandler}
                />
            </div>
        );
    }
}

export default Checkout;