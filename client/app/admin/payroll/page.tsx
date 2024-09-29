"use client";

import MainLayout from "../../components/MainLayout";
import withAuth from "../../components/withAuth";

const PayrollPage = () => {
    return (
        <MainLayout title="Payroll Page">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Payroll</h1>
            </div>
        </MainLayout>
    );
};

export default withAuth(PayrollPage, ["admin"]);
