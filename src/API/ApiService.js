import axios from 'axios';

const BASE_URL = 'https://mundiserver.vercel.app/api/';

// Axios instance
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

// Admin API functions
const AdminApiService = {
    adminlogin: (data) => api.post('auth/admin-signin', data),
    adminUsersList: (token) => api.get('admin/user-list', { 
        headers: { 
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        } 
    }),
};

// ✅ Assign to a variable before exporting
const services = { ApiService, AdminApiService };
export default services;
