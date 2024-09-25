// src/services/employeeService.ts
import axiosInstance from './axiosConfig';

// Function to fetch employees from NestJS API
export const getEmployees = async () => {
  const response = await axiosInstance.get('/employee');
  return response.data.result;
};

// Function to create a new employee in NestJS API
export const createEmployee = async (employeeData: unknown) => {
  const response = await axiosInstance.post('/employee', employeeData);
  return response.data.result;
};

export const getEmployeeById = async (id: string) => {
  const response = await axiosInstance.get(`/employee/${id}`);
  return response.data.result;
};

export const updateEmployee = async (id: string, employeeData: unknown) => {
  const response = await axiosInstance.patch(`/employee/${id}`, employeeData);
  return response.data.result;
};

export const deleteEmployee = async (id: string) => {
  const response = await axiosInstance.delete(`/employee/${id}`);
  return response.data.result;
};
