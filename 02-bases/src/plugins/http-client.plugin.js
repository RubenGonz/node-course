const axios = require('axios');

const httpClientPlugin = {
  get: async (url) => {
    // Con fetch
    // const resp = await fetch(url);
    // return data = await resp.json();

    // Con axios
    const { data } = await axios.get(url);
    return data;
  },
  post: async (url, body) => { },
  put: async (url, body) => { },
  delete: async (url) => { }
}

module.exports = {
  http: httpClientPlugin
}