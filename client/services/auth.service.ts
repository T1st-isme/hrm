import axiosInstance from './axiosConfig';

export const login = async (user: unknown) => {
    const response = await axiosInstance.post(`/auth/login`, user, {
        withCredentials: true,
    });
    return response.data;
};
