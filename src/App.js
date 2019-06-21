import React from 'react';
import './App.css';

function App() {
  // use Cloudinary Upload Widget directly
  const widget = window.cloudinary.createUploadWidget({
    cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
    uploadPreset: `${process.env.REACT_APP_UPLOAD_PRESET}`
 }, (error, result) => {
    if (!error && result && result.event === "success") {
      console.log('Done! Here is the link: ', result.info.secure_url);
    }
  });

  function openWidget() {
    widget.open();
  }

  return (
    <div className="App">
      <label>Use Cloudinary Upload Widget
        <br></br>
      </label>
      <br></br>
      <button onClick={openWidget}>Upload Docs</button>
    </div>
  );
}

export default App;
