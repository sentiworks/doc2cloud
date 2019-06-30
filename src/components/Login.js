import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import "./Login.css";
import SignInWidget from './SignInWidget';
import { withAuth } from '@okta/okta-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null
    };
    
    this.checkAuthentication();
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({authenticated});
    }
  }

  componentDidUpdate() {
    console.log("login updated");
    this.checkAuthentication();
  }

  handleSuccess = (res) => {
    if (res.status === 'SUCCESS') {
      console.log("user: ", res.user);
      if (res.type === 'SESSION_STEP_UP') {
        res.stepUp.finish();
      } 
      console.log("claims: ", res.claims);
      console.log("login success: ", res.session.token);
      res.session.setCookieAndRedirect(process.env.REACT_APP_OKTA_REDIRECTURI);
      /*
      this.props.auth.redirect({
        sessionToken: res.session.token
      });
      */
      return;
    } else {
      console.log("login unsuccess: ", this)
      // other states
    }
  }

  handleError = (err) => {
    console.log("login Error: ", err);
    var errorEl = document.createElement('div');
    errorEl.textContent = 'Error! ' + err.message;
    document.body.insertBefore(
      errorEl,
      document.body.firstChild
    );
  }

  render() {
    if (this.state.authenticated === null) {
      console.log("login rendering under no authentication");
      return null;
    }
    return (
      this.state.authenticated
      ? <Redirect to={{pathname: '/'}} />
      : <SignInWidget 
          baseUrl={this.props.baseUrl}
          onSuccess={this.handleSuccess}
          onError={this.handleError}
        />
    );
  }
}

export default withAuth(Login);
