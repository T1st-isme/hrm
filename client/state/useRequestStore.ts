import { approveLeaveRequest, createLeaveRequest, getLeaveRequest, rejectLeaveRequest } from "@/services/leaveRequest.service";
import { create } from "zustand";

interface LeaveRequest {
    id: string;
    employeeId: string;
    startDate: string;
    endDate: string;
    reason: string;
    status: string;
    employee: Employee;
}

interface Employee {
    id: string;
    fullName: string;
    email: string;
    contactNumber: string;
    department: Department;
    profilePicture: string;
}

interface Department {
    name: string;
}

interface RequestStore {
    leaveRequests: LeaveRequest[];
    loading: boolean;
    error: string | null;

    getLeaveRequests: () => Promise<void>;
    createLeaveRequest: (data: unknown) => Promise<void>;
    approveLeaveRequest: (id: string) => Promise<void>;
    rejectLeaveRequest: (id: string) => Promise<void>;
}

export const useRequestStore = create<RequestStore>((set, get) => ({
    leaveRequests: [],
    loading: false,
    error: null,

    getLeaveRequests: async () => {
        set({ loading: true, error: null });
        try {
            const response = await getLeaveRequest();
            const pendingRequests = response.result.filter((request: LeaveRequest) => request.status === "PENDING");
            if (response.success) {
                if (pendingRequests.length > 0) {
                    set({ leaveRequests: pendingRequests, loading: false });
                } else {
                    set({ leaveRequests: [], loading: false });
                }
            } else {
                set({ error: "Failed to get leave requests: " + response.message, loading: false });
            }
        } catch (error) {
            set({ error: "Failed to get leave requests: " + error, loading: false });
        }
    },

    createLeaveRequest: async (data: unknown) => {
        set({ loading: true, error: null });
        try {
            const response = await createLeaveRequest(data);
            set({ leaveRequests: [...get().leaveRequests, response.data], loading: false });
        } catch (error) {
            set({ error: "Failed to create leave request: " + error, loading: false });
        }
    },

    approveLeaveRequest: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await approveLeaveRequest(id);
            if (response.success) {
                set({
                    leaveRequests: get().leaveRequests.filter((request) => request.id !== id),
                    loading: false
                });
            } else {
                set({ error: "Failed to approve leave request: " + response.message, loading: false });
            }
        } catch (error) {
            set({ error: "Failed to approve leave request: " + error, loading: false });
        }
    },
    
    rejectLeaveRequest: async (id: string) => {
        set({ loading: true, error: null });
        try {
            const response = await rejectLeaveRequest(id);
            if (response.success) {
                set({
                    leaveRequests: get().leaveRequests.filter((request) => request.id !== id),
                    loading: false
                });
            } else {
                set({ error: "Failed to reject leave request: " + response.message, loading: false });
            }
        } catch (error) {
            set({ error: "Failed to reject leave request: " + error, loading: false });
        }
    },
}));
