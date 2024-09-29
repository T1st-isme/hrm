import axiosInstance from "./axiosConfig";

export const getDepartments = async () => {
    const response = await axiosInstance.get("/department");
    return response.data;
};

export const getDepartmentById = async (id: string) => {
    const response = await axiosInstance.get(`/department/${id}`);
    return response.data;
};

export const createDepartment = async (departmentData: unknown) => {
    const response = await axiosInstance.post("/department", departmentData);
    return response.data;
};

export const updateDepartment = async (id: string, departmentData: unknown) => {
    const response = await axiosInstance.patch(
        `/department/${id}`,
        departmentData
    );
    return response.data;
};

export const deleteDepartment = async (id: string) => {
    const response = await axiosInstance.delete(`/department/${id}`);
    return response.data;
};
