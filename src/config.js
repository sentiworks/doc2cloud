export const API_URL = 
  process.env.NODE_ENV === 'production' 
  ? 'https://doc2cloud.herokuapp.com' 
  : 'http://localhost:8080';
