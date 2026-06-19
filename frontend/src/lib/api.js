import axios from 'axios'

const BASE_API = import.meta.env.VITE_BASE_API;

const api = axios.create({
    baseURL: BASE_API,
    withCredentials: true
});

export default api;