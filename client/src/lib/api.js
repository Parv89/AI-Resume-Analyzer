import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 45000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach Supabase auth token or local demo token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('resumeiq_token') || 'demo-token';
  const user = JSON.parse(localStorage.getItem('resumeiq_user') || '{}');
  
  config.headers.Authorization = `Bearer ${token}`;
  if (user?.id) config.headers['x-user-id'] = user.id;
  if (user?.email) config.headers['x-user-email'] = user.email;

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Format responses and gracefully handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);

export const analyzeAPI = {
  uploadResume: (formData, onUploadProgress) => {
    return api.post('/analyze/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    });
  },
  analyzeText: (data) => api.post('/analyze/text', data),
  getAnalysis: (id) => api.get(`/analyze/${id}`),
};

export const jobMatchAPI = {
  match: (data) => api.post('/job-match/match', data),
  getList: () => api.get('/job-match/list'),
};

export const historyAPI = {
  getAll: () => api.get('/history'),
  delete: (id) => api.delete(`/history/${id}`),
};

export const healthAPI = {
  check: () => api.get('/health'),
};

export default api;
