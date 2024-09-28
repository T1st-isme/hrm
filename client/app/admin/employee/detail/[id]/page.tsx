"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import MainLayout from "../../../../components/MainLayout";
import { useEmployee } from "@/hooks/useEmployee";
import Loading from "@/app/components/loading";

export default function EmployeeDetailPage() {
    const params = useParams();
    const id = params.id;
    const { employee, loading, error, getEmployeeById } = useEmployee();

    useEffect(() => {
        if (id) {
            getEmployeeById(id as string);
        }
    }, [id, getEmployeeById]);

    if (error) return <div>Error: {error}</div>;
    if (!employee) return <Loading />;

    return (
        <MainLayout title="Employee Detail">
            {loading ? (
                <Loading />
            ) : (
                <div className="container mx-auto py-10">
                    <h1 className="text-2xl font-bold mb-4">Employee Detail</h1>
                    <div className="flex flex-col items-center">
                        <img
                            src={employee.profilePicture}
                            alt={employee.fullName}
                            className="h-32 w-32 rounded-full mb-4"
                        />
                        <h2 className="text-xl font-semibold">
                            {employee.fullName}
                        </h2>
                        <p className="text-gray-600">{employee.email}</p>
                        <p className="text-gray-600">
                            {employee.department?.name}
                        </p>
                        <p className="text-gray-600">{employee.jobTitle}</p>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
