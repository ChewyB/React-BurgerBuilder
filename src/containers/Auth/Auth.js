import React, { Component } from "react";
import Input from "../../components/UI/Forms/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'
import { checkValidity } from '../../shared/utility';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
      this.setState(prevState => {
          return {isSignUp: !prevState.isSignUp}
      })
  }



  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElementArray.map(formElement => (
      <Input
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        changed={event => this.inputChangedHandler(event, formElement.id)}
        key={formElement.id}
        value={formElement.config.value}
        elementConfig={formElement.config.elementConfig}
        elementType={formElement.config.elementType}
      />
    ));
    if(this.props.loading) {
        form = <Spinner/>
    }

    let errorMessage = null;
    if(this.props.error) {
        errorMessage = (
            <p>{this.props.error.message}</p>
        )
    }

    let authRedirect = null;
    if(this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath}/>
    }

    return (
      <div className={classes.Auth}>
      {authRedirect}
      {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked = {this.switchAuthModeHandler} btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGN-IN' : 'SIGN-UP'}</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(actions.auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
