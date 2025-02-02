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

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  handleSuccess = (res) => {
    if (res.status === 'SUCCESS') {
      return this.props.auth.redirect({
        sessionToken: res.session.token
      });
    } else {
      console.log("unsuccessful login: ");
      console.log("type: ", res.type);
      console.log("user: ", res.user);
    }
  }

  handleError = (err) => {
    const errorEl = document.createElement('div');
    errorEl.textContent = 'Error! ' + err.message;
    document.body.insertBefore(
      errorEl,
      document.body.firstChild
    );
  }

  render() {
    if (this.state.authenticated === null) {
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
