import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null
    }
  }

  checkAuthentication = async () => {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({authenticated});
    }
  }

  async componentDidMount() {
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    this.checkAuthentication();
  }

  login = async () => {
    this.props.auth.login('/');
  }

  logout = async () => {
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) {
      return null;
    }
    const content = this.state.authenticated
      ? (
        <div>
          <p>Use Cloudinary Widget to <Link to="/upload">upload</Link> documents to Cloud
          </p>
          <button className="btn btn-light btn-lg" onClick={this.logout}>
            Logout
          </button>
        </div>
      )
      : (
        <div>
          <p>
            Please login to load documents to Cloud
          </p>
          <button className="btn btn-darrk btn-large" onClick={this.login}>
            Login
          </button>
        </div>
      );
    return (
      <div>
        <h1>{content}</h1>
      </div>
    );
  }
}

export default withAuth(Home);
