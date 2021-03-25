import axios from 'axios';
import NProgress from 'nprogress';

export const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    timeout: 10000,
})

apiClient.interceptors.request.use(config => {
    return config;
})

apiClient.interceptors.response.use(response => {
    return response
})