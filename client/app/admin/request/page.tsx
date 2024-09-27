"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";
import MainLayout from "@/app/components/MainLayout";
import { useRequest } from "@/hooks/useRequest";

export default function RequestList() {
    const {
        leaveRequests,
        loading,
        getLeaveRequests,
        approveLeaveRequest,
        rejectLeaveRequest,
    } = useRequest();


    useEffect(() => {
        getLeaveRequests();
    }, [getLeaveRequests]);

    const handleAction = (id: string, action: "approve" | "reject") => {
        setTimeout(() => {
            if (action === "approve") {
                approveLeaveRequest(id);
            } else {
                rejectLeaveRequest(id);
            }
        }, 500);
    };

    return (
        <MainLayout title="Request List">
            <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-8">
                <div className="max-w-8xl">
                    {/* <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        Access Requests
                    </h1>
                    <p className="text-xl text-gray-600">
                        You have {requests.length} pending requests
                    </p>
                </header> */}
                    <div className="space-y-6">
                        {leaveRequests.map((request) => (
                            <motion.div
                                key={request.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                    <CardContent className="p-6 flex items-start">
                                        <Avatar className="h-16 w-16 mr-4">
                                            <AvatarImage
                                                src={
                                                    request.employee
                                                        .profilePicture
                                                }
                                                alt={request.employee.fullName}
                                            />
                                            <AvatarFallback className="text-lg">
                                                {request.employee.fullName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {request.employee.fullName}
                                            </h2>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {
                                                    request.employee.department
                                                        .name
                                                }
                                            </p>
                                            <p className="text-gray-600 mb-4">
                                                {request.reason}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-center space-y-2">
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    handleAction(
                                                        request.id,
                                                        "reject"
                                                    )
                                                }
                                                disabled={loading}
                                                className="bg-white hover:bg-red-50 text-red-500 border-red-300 hover:border-red-400"
                                            >
                                                <XIcon className="mr-2 h-4 w-4" />
                                                Reject
                                            </Button>
                                            <Button
                                                onClick={() =>
                                                    handleAction(
                                                        request.id,
                                                        "approve"
                                                    )
                                                }
                                                disabled={loading}
                                                className="bg-green-500 hover:bg-green-600 text-white"
                                            >
                                                <CheckIcon className="mr-2 h-4 w-4" />
                                                Approve
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    {leaveRequests.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center text-gray-500 mt-12"
                        >
                            <p className="text-2xl">No pending requests</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
