"use client";

import { useState, useEffect, useCallback } from "react";
import { useEmployee } from "@/hooks/useEmployee";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import MainLayout from "@/app/components/MainLayout";
import AddEmployeeModal from "@/app/components/Modal/AddEmployeeModal";
import { useRouter } from "next/navigation";
import EditEmployeeModal from "@/app/components/Modal/EditEmployeeModel";

export default function EmployeePage() {
    const {
        employees,
        loading,
        error,
        fetchEmployees,
        isDialogOpen,
        openDialog,
        closeDialog,
    } = useEmployee();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [editEmployeeId, setEditEmployeeId] = useState<string>("");
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const filteredEmployees = employees.filter(
        (employee) =>
            employee.fullName
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            employee.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id: string) => {
        // Ideally, you'll call an API to delete, then update state.
        // But for now, we can directly filter the employee list.
        // setEmployees((prev) => prev.filter((employee) => employee.id !== id));
        console.log("delete", id);
    };

    const handleEdit = useCallback(
        (id: string, event: React.MouseEvent) => {
            event.stopPropagation();
            setEditEmployeeId(id);
            openDialog();
        },
        [openDialog]
    );

    const handleAdd = () => {
        setIsAddModalOpen(true);
    };

    const handleCloseEditModal = useCallback(() => {
        closeDialog();
        // Refresh the employees list after closing the edit modal
        fetchEmployees();
    }, [closeDialog, fetchEmployees]);

    if (loading)
        return (
            <MainLayout title="">
                <div>Loading...</div>
            </MainLayout>
        );
    if (error)
        return (
            <MainLayout title="">
                <div>Error: {error}</div>
            </MainLayout>
        );
    if (!employees)
        return (
            <MainLayout title="">
                <div>No employees found.</div>
            </MainLayout>
        );

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
                    <Button onClick={handleAdd}>Add Employee</Button>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Role</TableHead>
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
                                            `/admin/employee/detail/${employee.id}`
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
                                                    {employee.fullName?.charAt(
                                                        0
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                            {employee.fullName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                    <TableCell>
                                        {employee.department?.name}
                                    </TableCell>
                                    <TableCell>{employee.jobTitle}</TableCell>
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
                                                    onClick={(event) =>
                                                        handleEdit(
                                                            employee.id as string,
                                                            event
                                                        )
                                                    }
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(
                                                            employee.id as string
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Lay off
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
            <EditEmployeeModal
                isOpen={isDialogOpen}
                onClose={handleCloseEditModal}
                employeeId={editEmployeeId}
            />
            <AddEmployeeModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </MainLayout>
    );
}
