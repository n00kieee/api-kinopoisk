import axios from "axios";

export const API_URL = "https://kinopoiskapiunofficial.tech/api/v2.2/";
const apiConfig = {
  headers: {
    "X-API-KEY": "56dd76f7-19f6-4e8c-96de-c03987d8470c",
    "Content-Type": "application/json",
    withCredentials: true,
  },
};

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers['X-API-KEY'] = "56dd76f7-19f6-4e8c-96de-c03987d8470c";
    config.headers['Content-Type'] = "application/json";
    return config;
});

export default $api