"use client";

import MainLayout from "./components/MainLayout";
import withAuth from "./components/withAuth";
import { Calendar, Clock, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    return (
        <MainLayout title="User Dashboard">
            <div className="flex flex-col min-h-screen bg-background">
                <main className="flex-1 py-6 px-4 lg:px-8">
                    <div className="max-w-8xl mx-auto space-y-6">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold">
                                Welcome back, {user?.firstName}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400">
                                {user?.jobTitle}
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Clock In/Out
                                    </CardTitle>
                                    <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <Button className="w-full">Clock In</Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Request Leave
                                    </CardTitle>
                                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        Request Leave
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        View Payslip
                                    </CardTitle>
                                    <FileText className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        Latest Payslip
                                    </Button>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Help Desk
                                    </CardTitle>
                                    <MessageSquare className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </CardHeader>
                                <CardContent>
                                    <Button
                                        className="w-full"
                                        variant="outline"
                                    >
                                        Open Ticket
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Leave</CardTitle>
                                    <CardDescription>
                                        Your scheduled time off
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="text-sm font-medium">
                                                Annual Leave
                                            </span>
                                            <span className="ml-auto text-sm">
                                                Dec 24 - Jan 2
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Calendar className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="text-sm font-medium">
                                                Personal Day
                                            </span>
                                            <span className="ml-auto text-sm">
                                                Feb 15
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activities</CardTitle>
                                    <CardDescription>
                                        Your latest actions and updates
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <Clock className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="text-sm">
                                                Clocked in at 9:00 AM today
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <FileText className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="text-sm">
                                                Payslip for November generated
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <MessageSquare className="mr-2 h-4 w-4 opacity-70" />
                                            <span className="text-sm">
                                                IT support ticket #1234 resolved
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
};

export default withAuth(Dashboard, ["user"]);
