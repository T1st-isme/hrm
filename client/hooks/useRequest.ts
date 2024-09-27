import { useRequestStore } from "@/state/useRequestStore";

export const useRequest = () => {
    const {
        leaveRequests,
        loading,
        error,
        getLeaveRequests,
        approveLeaveRequest,
        rejectLeaveRequest,
    } = useRequestStore();

    return {
        leaveRequests,
        loading,
        error,
        getLeaveRequests,
        approveLeaveRequest,
        rejectLeaveRequest,
    };
};
