import React, { Component } from 'react';
import './NotFound.css';
import image  from './sadface.png';

class NotFound extends Component {

  render() {
    return (
      <div className="NotFound container">
        <div className="row">
          <span className="NotFoundContent col-sm"> Page not found! </span>
        </div>
        <div className="row">
          <div className="col-sm">
            <img src={image} class="img-responsive" height="48" alt="404 not found"/> 
          </div>
        </div>
      </div>
    )    
  }
}

export default NotFound;
