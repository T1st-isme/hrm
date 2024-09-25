"use client";

import { Filter, MoreHorizontal, Plus } from "lucide-react";
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
import { useCallback, useEffect } from "react";
import { useDepartment } from "@/hooks/useDepartment";

export default function EmployeeDashboard() {
    // const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

    // const toggleEmployeeSelection = (id: number) => {
    //     setSelectedEmployees((prev) =>
    //         prev.includes(id)
    //             ? prev.filter((empId) => empId !== id)
    //             : [...prev, id]
    //     );
    // };

    const { departments, loading, error, fetchDepartments } = useDepartment();

    const memoizedFetchDepartments = useCallback(fetchDepartments, [
        fetchDepartments,
    ]);

    useEffect(() => {
        memoizedFetchDepartments();
    }, [memoizedFetchDepartments]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!departments || departments.length === 0)
        return <div>No departments found.</div>;

    return (
        <MainLayout title="Department">
            <div className="container mx-auto p-6 bg-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-2xl font-bold">All Department</h1>
                        <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* <span>{selectedEmployees.length} Selected</span> */}
                        <Button>
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
                                    {/* <Checkbox
                                    checked={selectedEmployees.includes(
                                        department.id
                                    )}
                                    onCheckedChange={() =>
                                        toggleEmployeeSelection(department.id)
                                    }
                                /> */}
                                    {/* <div
                                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                        department.status === "Active"
                                            ? "bg-green-100 text-green-800"
                                            : department.status === "Not Active"
                                            ? "bg-red-100 text-red-800"
                                            : department.status === "New Hire"
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                    {department.status}
                                </div> */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <div className="flex flex-col items-center mt-4 mb-6">
                                    <Avatar className="h-20 w-20 mb-4">
                                        <AvatarImage src={department.image} />
                                        <AvatarFallback>
                                            {department.name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <h3 className="font-semibold text-lg">
                                        {department.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        {department.description}
                                    </p>
                                </div>
                                {/* <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Department
                                    </span>
                                    <span>{department.department}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">
                                        Date Hired
                                    </span>
                                    <span>{department.hireDate}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src="/placeholder.svg?height=16&width=16&text=@"
                                        alt="Email"
                                        width={16}
                                        height={16}
                                    />
                                    <span>{department.email}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Image
                                        src="/placeholder.svg?height=16&width=16&text=☎"
                                        alt="Phone"
                                        width={16}
                                        height={16}
                                    />
                                    <span>{employee.phone}</span>
                                </div>
                            </div> */}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* <div className="flex justify-between items-center mt-6">
                <Select defaultValue="10">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Candidates per page" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10 per page</SelectItem>
                        <SelectItem value="20">20 per page</SelectItem>
                        <SelectItem value="50">50 per page</SelectItem>
                    </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                        Prev
                    </Button>
                    {[1, 2, 3, "...", 24].map((page, index) => (
                        <Button
                            key={index}
                            variant={page === 1 ? "default" : "outline"}
                            size="sm"
                        >
                            {page}
                        </Button>
                    ))}
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div> */}
            </div>
        </MainLayout>
    );
}
