// src/services/employeeService.ts
import axiosInstance from "./axiosConfig";

interface queryParams {
    page: number;
    limit: number;
    sort: string;
}

export const getEmployees = async (queryParams: queryParams) => {
    const response = await axiosInstance.get(
        `/employee?page=${queryParams.page}&limit=${queryParams.limit}&sort=${queryParams.sort}`
    );
    return response.data;
};

export const createEmployee = async (formData: FormData) => {
    const response = await axiosInstance.post("/employee", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};

export const getEmployeeById = async (id: string) => {
    const response = await axiosInstance.get(`/employee/${id}`);
    return response.data;
};

export const updateEmployee = async (id: string, employeeData: unknown) => {
    const response = await axiosInstance.patch(`/employee/${id}`, employeeData);
    return response.data;
};

export const deleteEmployee = async (id: string) => {
    const response = await axiosInstance.delete(`/employee/${id}`);
    return response.data;
};
