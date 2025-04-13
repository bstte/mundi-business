import axios from 'axios';

// const BASE_URL = 'https://mundiserver.vercel.app/api/';
const BASE_URL = 'https://server-production-2097.up.railway.app/api/';
// const DEEPSEEK_API_KEY = 'sk-e40a6b69c6714fa588f5c1145cbdbafd';
const LOCAL_URL = 'http://127.0.0.1:5000/';

// Axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});



const localApi = axios.create({
    baseURL: LOCAL_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});

// Axios instance for file upload
const fileApi = axios.create({
    baseURL: LOCAL_URL,
    headers: {
      'Content-Type': 'multipart/form-data',
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
    excel_data: (token, excelData) => api.post('user/excel-data', excelData, { 
        headers: { Authorization: `Bearer ${token}` } 
    }),

    getInsights: (token, data) => api.post('user/get-insights', data, { 
        headers: { Authorization: `Bearer ${token}` } 
    }),

    getCustomInsights: (token, data) => api.post('user/get-custom-insights', data, { 
        headers: { Authorization: `Bearer ${token}` } 
    }),
    
    chatWithDeepSeek: (message) => localApi.post('chat', { message }),
    uploadFile: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return fileApi.post('chat', formData);
    },

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
