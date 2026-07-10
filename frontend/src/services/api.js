import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// Fetch all tasks
export const fetchTasks = () => api.get("/tasks");

// Fetch task statistics
export const fetchStats = () => api.get("/tasks/stats");

// Create task
export const createTask = (task) => api.post("/tasks", task);

// Update task
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task);

// Mark task as completed
export const completeTask = (id) =>
  api.patch(`/tasks/${id}/complete`);

// Delete task
export const deleteTask = (id) =>
  api.delete(`/tasks/${id}`);

export default api;