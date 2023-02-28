import axios from "axios";

export const API_URL = "https://kinopoiskapiunofficial.tech/api/";

const $api = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use(config => {
    config.headers["X-API-KEY"] = "ed3b9d17-e396-47d6-be12-afd9e49871c8";
    config.headers["Content-Type"] = "application/json";
    return config;
});

export default $api
