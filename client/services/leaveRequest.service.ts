import axiosInstance from "./axiosConfig";

export const getLeaveRequest = async () => {
    const response = await axiosInstance.get("/leave-request");
    return response.data;
};

export const createLeaveRequest = async (data: unknown) => {
    const response = await axiosInstance.post("/leave-request", data);
    return response.data;
};

export const getLeaveRequestById = async (id: string) => {
    const response = await axiosInstance.get(`/leave-request/employee/${id}`);
    return response.data;
};

export const approveLeaveRequest = async (id: string) => {
    const response = await axiosInstance.patch(`/leave-request/${id}/approve`);
    return response.data;
};

export const rejectLeaveRequest = async (id: string) => {
    const response = await axiosInstance.patch(`/leave-request/${id}/reject`);
    return response.data;
};
