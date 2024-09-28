"use client";

import { useAuth } from "@/hooks/useAuth";
import { LeaveRequestForm } from "../components/leave-request";
import MainLayout from "../components/MainLayout";
import withAuth from "../components/withAuth";
import { useEffect } from "react";
import { useRequest } from "@/hooks/useRequest";
import Loading from "../components/loading";

const RequestPage = () => {
    const { leaveRequest, getLeaveRequestById, loading } = useRequest();
    const { user } = useAuth();

    useEffect(() => {
        getLeaveRequestById(user?.id as string);
    }, [user?.id, getLeaveRequestById]);

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <MainLayout title="Request Page">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Leave Request</h1>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Submit Leave Request
                        </h2>
                        <LeaveRequestForm />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Leave Request History
                        </h2>
                        {loading ? (
                            <Loading />
                        ) : leaveRequest?.length === 0 ? (
                            <div className="bg-white shadow rounded-lg p-6">
                                <p className="text-gray-500">
                                    No leave request history found.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-white shadow rounded-lg p-6">
                                <ul className="space-y-2">
                                    {leaveRequest?.map((request) => (
                                        <li
                                            key={request.id}
                                            className="flex justify-between"
                                        >
                                            <div>
                                                {/* <span className="font-medium">
                                                {request.type}
                                            </span> */}
                                                <span className="block text-sm text-gray-500">
                                                    {formatDate(
                                                        request.startDate
                                                    )}{" "}
                                                    -{" "}
                                                    {formatDate(
                                                        request.endDate
                                                    )}
                                                </span>
                                            </div>
                                            <span
                                                className={`font-medium ${
                                                    request.status ===
                                                    "Approved"
                                                        ? "text-green-500"
                                                        : request.status ===
                                                          "Rejected"
                                                        ? "text-red-500"
                                                        : "text-yellow-500"
                                                }`}
                                            >
                                                {request.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default withAuth(RequestPage, ["user"]);
