import axios from 'axios';

// Create an instance of Axios
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Base URL for the API
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Set up request interceptors (if needed)
api.interceptors.request.use(
    (config) => {
        // Add any custom logic or headers here, like authorization tokens
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Set up response interceptors (if needed)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors here
        return Promise.reject(error);
    }
);

export default api;
