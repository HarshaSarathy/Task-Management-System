import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

export const getTasks = () => axios.get(API_BASE_URL);
export const createTask = (task) => axios.post(API_BASE_URL, task);
export const updateTask = (id, task) => axios.put(`${API_BASE_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
export const searchTasks = (query) => axios.get(`${API_BASE_URL}/search?query=${query}`);