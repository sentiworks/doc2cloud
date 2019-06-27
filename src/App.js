import React from 'react';
import './App.css';
import Login from './components/Login';
import Widget from './components/Widget';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      widget: null,
    }
    this.handleLoginStatus = this.handleLoginStatus.bind(this);
    this.handleWidgetStatus = this.handleWidgetStatus.bind(this);
  }

  handleLoginStatus() {
    this.setState({isAuthenticated: true});
  }

  handleWidgetStatus(widget) {
    this.setState({widget: widget});
  }

  render() {
    const options = {
      isAuthenticated: this.state.isAuthenticated,
      onSubmitStatus: this.handleLoginStatus,
      widget: this.state.widget,
      onWidgetStatus: this.handleWidgetStatus
    }
    return (
      <div className="App">
        <label>Use Cloudinary Upload Widget to store images in Cloud</label>
        <Login options={options} />
        <Widget options={options} />
      </div>
    );
  };
}

export default App;
