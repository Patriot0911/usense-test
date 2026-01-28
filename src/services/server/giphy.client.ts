import axios from 'axios';

export const giphyClient = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs',
  timeout: 10_000,
  params: {
    api_key: process.env.GIPHY_API_KEY,
    rating: 'g',
    lang: 'uk',
  },
});
