import React, { Component } from "react";
import "./Login.css";

 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      submitted: false,
      loading: false
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm = () => {
    return this.state.email.length > 0 
      && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({submitted: true});
    const {email, password} = this.state;

    // need further work
    const correctEmail = (email === `${process.env.REACT_APP_LOGIN_EMAIL}`);
    const correctPassword = (password.length >= 8);
    if ( !correctEmail && !correctPassword ) {
      alert("wrong email & password");
      return;
    } else if (!correctEmail) {
      alert("wrong email");
      return;
    } else if (!correctPassword) {
      alert("wrong password");
      return;
    }

    this.setState({loading: true});

    try {
      this.props.options.onSubmitStatus();
      this.props.options.widget.open();
    } catch (err) {
      this.setState({loading: false});
      alert(err.message);
    }
  }

  handleLoginForm = () => {
    if (!this.props.options.isAuthenticated) {
      return (
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group-email">
            <label for="email">Email</label>
            <input
              autoFocus
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group-password">
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group-button">
            <button
              block
              disabled={!this.validateForm()}
              type="submit"
            >Login</button>
          </div>
        </form>
      )
    }
  }

  render() {
    return (
      <div className="Login">
        {this.handleLoginForm()}
      </div>
    );
  }
}

export default Login;