"use client";

import { useState } from "react";
import { Calendar, Mail, MapPin, Phone, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "../components/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function EmployeeProfile() {
    const [activeTab, setActiveTab] = useState("overview");
    const { user } = useAuth();

    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        });
    };

    return (
        <MainLayout title="Profile">
            <div className="flex flex-col min-h-screen bg-background">
                <main className="flex-1 py-6 px-4 lg:px-8">
                    <div className="max-w-8xl mx-auto space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage
                                        src={user?.profilePicture}
                                        alt={user?.fullName}
                                    />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {user?.fullName}
                                    </h1>
                                    <p className="text-muted-foreground">
                                        {user?.jobTitle}
                                    </p>
                                </div>
                            </div>
                            <Button asChild>
                                <Link href="/profile/edit">Edit Profile</Link>
                            </Button>
                        </div>
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 opacity-70" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 opacity-70" />
                                        <span>{user?.contactNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 opacity-70" />
                                        <span>{user?.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 opacity-70" />
                                        <span>
                                            Joined{" "}
                                            {formatDate(
                                                user?.createdAt as string
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Tabs
                            defaultValue="overview"
                            className="w-full"
                            onValueChange={setActiveTab}
                        >
                            <TabsList>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="performance">
                                    Performance
                                </TabsTrigger>
                                <TabsTrigger value="documents">
                                    Documents
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent
                                value="overview"
                                className="mt-6 space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Job Information</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <dl className="grid gap-2 sm:grid-cols-2">
                                            <div>
                                                <dt className="font-medium">
                                                    Department
                                                </dt>
                                                <dd className="text-muted-foreground">
                                                    {user?.department}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium">
                                                    Position
                                                </dt>
                                                <dd className="text-muted-foreground">
                                                    {user?.jobTitle}
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium">
                                                    Manager
                                                </dt>
                                                <dd className="text-muted-foreground">
                                                    Jane Smith
                                                </dd>
                                            </div>
                                            <div>
                                                <dt className="font-medium">
                                                    Employment Type
                                                </dt>
                                                <dd className="text-muted-foreground">
                                                    Full-time
                                                </dd>
                                            </div>
                                        </dl>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Activities</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        Completed project
                                                        milestone
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Frontend redesign for
                                                        Project X
                                                    </p>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    2 days ago
                                                </p>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        Received performance
                                                        bonus
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Q2 Performance Review
                                                    </p>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    1 week ago
                                                </p>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-orange-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        Enrolled in training
                                                        program
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Advanced React
                                                        Techniques
                                                    </p>
                                                </div>
                                                <p className="text-sm text-muted-foreground">
                                                    2 weeks ago
                                                </p>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent
                                value="performance"
                                className="mt-6 space-y-6"
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Performance Metrics
                                        </CardTitle>
                                        <CardDescription>
                                            Last 6 months performance overview
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">
                                                        Project Completion Rate
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        92%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={92}
                                                    className="h-2"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">
                                                        Code Quality Score
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        88%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={88}
                                                    className="h-2"
                                                />
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">
                                                        Team Collaboration
                                                    </span>
                                                    <span className="text-sm font-medium">
                                                        95%
                                                    </span>
                                                </div>
                                                <Progress
                                                    value={95}
                                                    className="h-2"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Goals</CardTitle>
                                        <CardDescription>
                                            Current quarter objectives
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            <li className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        Complete Advanced React
                                                        Certification
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Due in 2 months
                                                    </p>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    In Progress
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        Mentor two junior
                                                        developers
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Ongoing
                                                    </p>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    On Track
                                                </span>
                                            </li>
                                            <li className="flex items-center gap-4">
                                                <div className="h-2 w-2 rounded-full bg-orange-500" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium">
                                                        Improve code review
                                                        turnaround time
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Target: 24 hours
                                                    </p>
                                                </div>
                                                <span className="text-sm font-medium">
                                                    Needs Attention
                                                </span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="documents" className="mt-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>
                                            Employee Documents
                                        </CardTitle>
                                        <CardDescription>
                                            Access and manage your important
                                            documents
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            <li className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            Employment Contract
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Uploaded on Jan 15,
                                                            2020
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            Performance Reviews
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Last updated on Jun
                                                            30, 2024
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </li>
                                            <li className="flex items-center justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-500">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="w-6 h-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                                                            />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">
                                                            Training
                                                            Certificates
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            3 certificates
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}
