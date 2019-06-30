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
      console.log("home authenticated: ", authenticated);
      this.setState({authenticated});
    }
  }

  async componentDidMount() {
    console.log('home mount');
    this.checkAuthentication();
  }

  async componentDidUpdate() {
    console.log("home update");
    this.checkAuthentication();
  }

  login = async () => {
    console.log("home async login");
    this.props.auth.login('/');
  }

  logout = async () => {
    console.log("home async logout");
    this.props.auth.logout('/');
  }

  render() {
    if (this.state.authenticated === null) {
      console.log("home rendering under no authentication");
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
