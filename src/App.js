import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  // state = {
  //   show: true
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({show: false})
  //   }, 5000);
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/checkout" component={Checkout} />
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
