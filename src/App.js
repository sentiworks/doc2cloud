import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import UploadWidget from './components/UploadWidget';
import NotFound from './components/NotFound';

class App extends React.Component {

  handleAuthRequired = ({history}) => {
    history.push('/login');
  }
    
  renderLogin = () => {
    return (
      <Login baseUrl={`${process.env.REACT_APP_OKTA_BASEURL}`} />
    )
  }

  render() {
    return (
      <Router>
        <Security
          issuer={process.env.REACT_APP_OKTA_BASEURL + '/oauth2/default'}
          client_id={process.env.REACT_APP_OKTA_CLIENTID}
          redirect_uri={process.env.REACT_APP_OKTA_REDIRECTURI}
          onAuthRequired={this.handleAuthRequired}
        >
          <div className="App">
            <Switch>
              <Route path="/" exact component={Home} />
              <SecureRoute path="/upload" exact component={UploadWidget} />
              <Route path="/login" exact render={this.renderLogin} />
              <Route path="/implicit/callback" exact component={ImplicitCallback} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Security>
      </Router>
    );
  };
}

export default App;
