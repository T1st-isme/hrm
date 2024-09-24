"use client";

import { Input } from "@/components/ui/input";
import MainLayout from "../../components/MainLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Employee {
    id: string;
    fullName: string;
    email: string;
    departmentId: string;
    jobTitle: string;
    profilePicture: string;
}

export default function EmployeePage() {
    const [emp, setEmp] = useState<Employee[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchEmp = async () => {
            try {
                const res = await fetch("http://localhost:8080/employee");

                if (!res.ok) {
                    throw new Error("Failed to fetch employees");
                }

                const data: Employee[] = await res.json();
                setEmp(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchEmp();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!emp || emp.length === 0) return <div>No employees found.</div>;

    const filteredEmployees = emp.filter(
        (employee) =>
            employee.fullName
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.departmentId
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            employee.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        setEmp(emp.filter((employee) => employee.id !== id));
    };

    const handleEdit = (id: string) => {
        // Implement edit functionality here
        console.log(`Edit employee with id: ${id}`);
    };

    return (
        <MainLayout title="Employee">
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold mb-4">Employee List</h1>
                <div className="flex justify-between items-center mb-4">
                    <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                    />
                    <Button onClick={() => router.push("/admin/employee/add")}>
                        Add Employee
                    </Button>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
                                {/* <TableHead>Status</TableHead> */}
                                <TableHead className="text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEmployees.map((employee) => (
                                <TableRow
                                    key={employee.id}
                                    onClick={() =>
                                        router.push(
                                            `/admin/employee/${employee.id}`
                                        )
                                    }
                                    className="cursor-pointer"
                                >
                                    <TableCell className="font-medium">
                                        <div className="flex items-center">
                                            <Avatar className="h-8 w-8 mr-2">
                                                <AvatarImage
                                                    src={
                                                        employee.profilePicture
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {employee.fullName.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            {employee.fullName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>
                                        {employee.departmentId}
                                    </TableCell>
                                    <TableCell>{employee.jobTitle}</TableCell>
                                    {/* <TableCell>
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                        employee.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : employee.status === "On Leave"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                                        >
                                            {employee.status}
                                        </span>
                                    </TableCell> */}
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0"
                                                >
                                                    <span className="sr-only">
                                                        Open menu
                                                    </span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>
                                                    Actions
                                                </DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEdit(employee.id)
                                                    }
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(
                                                            employee.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </MainLayout>
    );
}
