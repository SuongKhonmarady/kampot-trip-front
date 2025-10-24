import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tosderleng.tech/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Locations API
export const locationApi = {
  getAll: () => api.get('/locations'),
  getById: (id) => api.get(`/locations/${id}`),
  create: (data) => api.post('/locations', data),
  update: (id, data) => api.put(`/locations/${id}`, data),
  delete: (id) => api.delete(`/locations/${id}`),
  togglePin: (id) => api.post(`/locations/${id}/toggle-pin`),
};

// Schedules API
export const scheduleApi = {
  getAll: () => api.get('/schedules'),
  getByDay: (day) => api.get(`/schedules/day/${day}`),
  create: (data) => api.post('/schedules', data),
  update: (id, data) => api.put(`/schedules/${id}`, data),
  delete: (id) => api.delete(`/schedules/${id}`),
  updateDayTitle: (day, title) => api.put(`/schedules/day/${day}/title`, { day_title: title }),
};

export default api;
