import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

// ✅ Create axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
});

// ✅ Automatically attach JWT to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

// ================= Physical Health =================
export const savePhysicalHealthData = (data) => {
  const userId = localStorage.getItem("userId");
  return API.post(`/physical/save/${userId}`, data);
};

// ================= Nutrition =================
export const saveNutritionData = (payload) => {
  const userId = localStorage.getItem("userId");
  return API.post(`/api/nutrition/${userId}`, payload);
};

// ================= Mental Wellness =================
export const saveMentalWellnessData = (data) =>
  API.post("/mental-wellness", data);

// ================= Workout =================
export const saveWorkoutData = (data) =>
  API.post("/workout", data);

export default API;