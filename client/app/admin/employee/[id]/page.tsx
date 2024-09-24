"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MainLayout from "../../../components/MainLayout";

interface Employee {
    id: string;
    username: string;
    email: string;
    departmentId: string;
    jobTitle: string;
    profilePicture: string;
}

export default function EmployeeDetailPage() {
    const params = useParams();
    console.log("params", params.id);
    const id = params.id;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const fetchEmployee = async () => {
                try {
                    const res = await fetch(
                        `http://localhost:8080/employee/${id}`
                    );
                    if (!res.ok) {
                        throw new Error("Failed to fetch employee details");
                    }
                    const data: Employee = await res.json();
                    setEmployee(data);
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

            fetchEmployee();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!employee) return <div>No employee found.</div>;

    return (
        <MainLayout title="Employee Detail">
            <div className="container mx-auto py-10">
                <h1 className="text-2xl font-bold mb-4">Employee Detail</h1>
                <div className="flex flex-col items-center">
                    <img
                        src={employee.profilePicture}
                        alt={employee.username}
                        className="h-32 w-32 rounded-full mb-4"
                    />
                    <h2 className="text-xl font-semibold">
                        {employee.username}
                    </h2>
                    <p className="text-gray-600">{employee.email}</p>
                    <p className="text-gray-600">{employee.departmentId}</p>
                    <p className="text-gray-600">{employee.jobTitle}</p>
                </div>
            </div>
        </MainLayout>
    );
}
