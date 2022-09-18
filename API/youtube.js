import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  headers: {},
  params: {
    part: 'snippet',
    maxResults: 5,
    key: process.env.API_KEY,
  },
});
