"use client";

import {
    Filter,
    Loader2,
    MoreHorizontal,
    Pencil,
    Plus,
    Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainLayout from "@/app/components/MainLayout";
import { useCallback, useEffect, useState } from "react";
import { useDepartment } from "@/hooks/useDepartment";
import AddDepartmentModal from "@/app/components/Modal/AddDepartmentModal";
import EditDepartmentModal from "@/app/components/Modal/EditDepartmentModal";
import withAuth from "@/app/components/withAuth";

const DepartmentPage = () => {
    const {
        departments,
        loading,
        error,
        fetchDepartments,
        isDialogOpen,
        openDialog,
        closeDialog,
        deleteDepartment,
    } = useDepartment();
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
    const [editDepartmentId, setEditDepartmentId] = useState<string>("");

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    const handleAdd = useCallback(() => {
        setIsAddModalOpen(true);
    }, []);

    const handleEdit = useCallback(
        (id: string | undefined) => {
            if (id) {
                setEditDepartmentId(id);
                openDialog();
            }
        },
        [openDialog]
    );
    const handleDelete = useCallback(
        (id: string | undefined) => {
            if (id) {
                deleteDepartment(id);
            }
        },
        [deleteDepartment]
    );

    const handleCloseEditModal = useCallback(() => {
        closeDialog();
        fetchDepartments();
    }, [closeDialog, fetchDepartments]);

    if (error) return <div>Error: {error}</div>;
    if (!departments || departments.length === 0)
        return <div>No departments found.</div>;
    return (
        <MainLayout title="Department">
            {loading ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="flex items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    </div>
                </div>
            ) : (
                <div className="container mx-auto p-6 bg-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold">
                                All Departments
                            </h1>
                            <Button variant="outline" size="sm">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                            </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button onClick={handleAdd}>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Department
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {departments.map((department) => (
                            <Card key={department.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                >
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleEdit(
                                                            department.id
                                                        )
                                                    }
                                                >
                                                    <Pencil className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDelete(
                                                            department.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="flex flex-col items-center mt-4 mb-6">
                                        <Avatar className="h-20 w-20 mb-4">
                                            <AvatarImage
                                                src={department.image}
                                            />
                                            <AvatarFallback>
                                                {department.name
                                                    ? department.name.charAt(0)
                                                    : "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <h3 className="font-semibold text-lg">
                                            {department.name}
                                        </h3>
                                        <p className="text-gray-500">
                                            {department.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            <AddDepartmentModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
            <EditDepartmentModal
                isOpen={isDialogOpen}
                onClose={handleCloseEditModal}
                departmentId={editDepartmentId}
            />
        </MainLayout>
    );
};

export default withAuth(DepartmentPage);
