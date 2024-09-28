"use client";

import MainLayout from "../components/MainLayout";
import withAuth from "../components/withAuth";
import { Bell, Building, ChevronDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function AdminPage() {
    return (
        <MainLayout title="Admin Dashboard">
            <div className="flex flex-col min-h-screen bg-background">
                <main className="flex-1 py-6 px-4 lg:px-8">
                    <div className="max-w-8xl mx-auto space-y-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold">
                                Admin Dashboard
                            </h1>
                            <Button>Generate Report</Button>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Total Employees
                                    </CardTitle>
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        1,234
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        +5% from last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Departments
                                    </CardTitle>
                                    <Building className="w-4 h-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">12</div>
                                    <p className="text-xs text-muted-foreground">
                                        2 new this quarter
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Open Positions
                                    </CardTitle>
                                    <Users className="w-4 h-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">23</div>
                                    <p className="text-xs text-muted-foreground">
                                        7 filled last month
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">
                                        Pending Requests
                                    </CardTitle>
                                    <Bell className="w-4 h-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">18</div>
                                    <p className="text-xs text-muted-foreground">
                                        5 new since yesterday
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activities</CardTitle>
                                    <CardDescription>
                                        Latest actions in the system
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                John Doe clocked in
                                            </span>
                                            <span className="ml-auto text-sm text-muted-foreground">
                                                2 mins ago
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                New leave request from Jane
                                                Smith
                                            </span>
                                            <span className="ml-auto text-sm text-muted-foreground">
                                                10 mins ago
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                Payroll processed for May
                                            </span>
                                            <span className="ml-auto text-sm text-muted-foreground">
                                                1 hour ago
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Department Overview</CardTitle>
                                    <CardDescription>
                                        Employee distribution by department
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                Engineering
                                            </span>
                                            <span className="ml-auto text-sm">
                                                45%
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                Sales
                                            </span>
                                            <span className="ml-auto text-sm">
                                                30%
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                Marketing
                                            </span>
                                            <span className="ml-auto text-sm">
                                                15%
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="text-sm font-medium">
                                                Human Resources
                                            </span>
                                            <span className="ml-auto text-sm">
                                                10%
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle>Employee Management</CardTitle>
                                <CardDescription>
                                    Manage your workforce
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 mb-4">
                                    <Input
                                        placeholder="Search employees..."
                                        className="max-w-sm"
                                    />
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                Filter
                                                <ChevronDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                All Departments
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Engineering
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Sales
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Marketing
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Human Resources
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Department</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>Engineering</TableCell>
                                            <TableCell>Active</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Jane Smith</TableCell>
                                            <TableCell>Sales</TableCell>
                                            <TableCell>Active</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Bob Johnson</TableCell>
                                            <TableCell>Marketing</TableCell>
                                            <TableCell>On Leave</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </div>
        </MainLayout>
    );
}

export default withAuth(AdminPage, ["admin"]);
