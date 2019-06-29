import React, { Component } from "react";
import ReactDom from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

class SignInWidget extends Component {

  componentDidMount() {
    const el = ReactDom.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,

    });
    this.widget.renderEl({el}, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}

export default SignInWidget;