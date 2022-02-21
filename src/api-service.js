const API_KEY = '25616509-8eba6619d00cba2f4a1d7faa3';
const BASE_URL = 'https://pixabay.com/api/';

import './sass/main.scss';
const axios = require('axios');

export default class GaleryApiSerwice {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImg() {
    const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    try {
      const response = await axios.get(url);
      this.incrementPage();
      return response.data;
    } catch (error) {
      return error;
    }
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
