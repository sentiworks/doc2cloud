import React from 'react';

class Widget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widget: null
    }
  }

  componentDidMount = () => {
    // use Cloudinary Upload Widget directly
    const widget = window.cloudinary.createUploadWidget({
      cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
      uploadPreset: `${process.env.REACT_APP_UPLOAD_PRESET}`
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the link: ', result.info.secure_url);
      }
    });
    this.setState({widget: widget});
    this.props.options.onWidgetStatus(widget);
  }
  
  openWidget = () => {
    // need further work
    const widget = this.state.widget;
    if (this.state.options.isAuthenticated) {
      return (
        <div>{widget.open}</div>
      );
    } else {
      return (
        <div>
          <button onClick={this.openWidget}>Upload Docs again</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="Widget">
        {this.openWidget}
      </div>
    );
  }
}

export default Widget;
