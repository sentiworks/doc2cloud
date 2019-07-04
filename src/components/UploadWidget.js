import React from 'react';

const TAG = process.env.REACT_APP_UPLOAD_PRESET;

class UploadWidget extends React.Component {

  componentDidMount() {
    // use Cloudinary Upload Widget directly
    const options = {
      cloudName: process.env.REACT_APP_CLOUD_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      tags: [TAG]
    }
    this.widget = window.cloudinary.createUploadWidget(options, 
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Done! Here is the link: ', result.info.secure_url);
        } else if (result.event === "abort") {
          const {history} = this.props;
          history.push('/dashboard');
        }
      }
    );
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
