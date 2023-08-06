import axios from 'axios';

export default axios.create({
  baseURL: 'https://adt8api.azurewebsites.net/api',
  headers: {
    'Content-type': 'application/json'
  }
});
