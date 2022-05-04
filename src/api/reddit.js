//import axios from "axios";
const axios = require("axios").default;

const ROOT_URL = "https://www.reddit.com";

axios.defaults.baseURL = ROOT_URL;

axios.interceptors.response.use(
  async ({ data }) => data.data,
  (error) => {
    return Promise.reject(error);
  }
);

const Reddit = {
  searchPostsByQuery: (query) =>
    axios.get("/search.json", { params: { q: query } }),
  getPopularPosts: () => axios.get("/r/popular.json"),
};

module.exports = Reddit;
