import React from 'react';
import axios from 'axios';
import { CloudinaryContext, Video, Image } from 'cloudinary-react';

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const TAG = process.env.REACT_APP_UPLOAD_PRESET;

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      video: []
    }
  }

  componentDidMount() {
    this.getImages();
    this.getVideos();
    const {history} = this.props;
    history.push('/dashboard');
  }

  getVideos = () => {
    const api = `https://res.cloudinary.com/${CLOUD_NAME}/video/list/${TAG}.json`;
    axios.get(api)
    .then(res => {
      console.log("res.data: ", res.data.resources);
      this.setState({ video: res.data.resources });
    })
    .catch(err => {
      console.log("found in getVideos: ", err);
    });
  }

  getImages = () => {
    const api = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${TAG}.json`;
    axios.get(api)
    .then(res => {
      console.log("res.data: ", res.data.resources);
      this.setState({ image: res.data.resources });
    })
    .catch(err => {
      console.log("found in getImages: ", err);
    });
  }

  back2upload = () => {
    const {history} = this.props;
    history.push('/');   
  }

  render() {
    const { image, video } = this.state;
    return (
      <div>
        <CloudinaryContext cloudName={CLOUD_NAME}>
          {
            video.map( (data, index) => (
              <div className='col-sm-4' key={index}>
                <div className="">
                  <Video publicId={data.public_id} controls></Video>
                </div>
                <div>Created at {data.created_at}</div>
              </div>
            ))
          }
        </CloudinaryContext>
        <br />
        <CloudinaryContext cloudName={CLOUD_NAME}>
          {
            image.map( (data, index) => (
              <div className='col-sm-4' key={index}>
                <div className="">
                  <Image publicId={data.public_id} controls></Image>
                </div>
                <div>Created at {data.created_at}</div>
              </div>
            ))
          }
        </CloudinaryContext>
        <br />
        <button onClick={this.back2upload}>Back</button>
      </div>
    );
  }
}

export default Dashboard;