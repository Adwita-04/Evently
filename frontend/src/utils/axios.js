import axios from 'axios';

const api = axios.create({
    // File: frontend/src/utils/axios.js
    // Use the same site's /api path after deployment. VITE_API_URL remains
    // available for an optional separate API URL during local development.
    baseURL:import.meta.env.VITE_API_URL || '/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
