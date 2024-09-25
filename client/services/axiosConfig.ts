// src/services/axiosConfig.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.PORT ?? 'http://localhost:8080', // Use NestJS API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
