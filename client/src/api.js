import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getBhajans = () => api.get('/api/bhajans');
export const getBhajan = (id) => api.get(`/api/bhajans/${id}`);
export const addBhajan = (bhajan) => api.post('/api/bhajans', bhajan);
export const updateBhajan = (id, bhajan) => api.put(`/api/bhajans/${id}`, bhajan);
export const deleteBhajan = (id) => api.delete(`/api/bhajans/${id}`);
export const requestAlternateMatch = (id) => api.post(`/api/bhajans/${id}/match-alternate`);
export const searchBhajans = (query) => api.get('/search', { params: { query } });

export default api;
