import { useRequestStore } from "@/state/useRequestStore";

export const useRequest = () => {
    const {
        leaveRequests,
        loading,
        error,
        leaveRequest,
        createLeaveRequest,
        getLeaveRequests,
        approveLeaveRequest,
        rejectLeaveRequest,
        getLeaveRequestById,
    } = useRequestStore();

    return {
        leaveRequests,
        loading,
        error,
        leaveRequest,
        getLeaveRequests,
        createLeaveRequest,
        approveLeaveRequest,
        rejectLeaveRequest,
        getLeaveRequestById,
    };
};
