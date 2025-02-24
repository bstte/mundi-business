import axios from 'axios';

const BASE_URL = 'https://mundiserver.vercel.app/api/';

// Axios instance bana lo taaki har request me base URL set rahe
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// API functions
const ApiService = {
    SendVerificationCode: (data) => api.post('auth/send-verification-code', data),
    VerifyCode: (data) => api.post('auth/verify-verification-code', data),
    signup: (data) => api.post('auth/signup', data),
    login: (data) => api.post('auth/signin', data),
    getUserProfile: (token) => api.get('user/profile', { 
        headers: { Authorization: `Bearer ${token}` } 
    }),

   
};

export default ApiService;
