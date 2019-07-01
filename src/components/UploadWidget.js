import React from 'react';

class UploadWidget extends React.Component {

  componentDidMount() {
    // use Cloudinary Upload Widget directly
    this.widget = window.cloudinary.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        console.log('Done! Here is the link: ', result.info.secure_url);
      } else if (result.event === "abort") {
        const {history} = this.props;
        history.push('/');
      }
    });
    this.widget.open();
  }

  componentWillUnmount() {
    this.widget.close()
  }

  render() {
    return <div />;
  }
}

export default UploadWidget;
