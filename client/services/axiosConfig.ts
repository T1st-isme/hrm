// import Cookies from 'js-cookie';
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.PORT ?? "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.interceptors.request.use((config) => {
//     const token = Cookies.get("jwt");
//     console.log("token", token);
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response.status === 401) {
//             // Redirect to login page if unauthorized
//             window.location.href = "/login";
//         }
//         return Promise.reject(new Error(error.response.data.message));
//     }
// );

export default axiosInstance;
