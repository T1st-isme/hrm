import MainLayout from "@/app/components/MainLayout";

export default function UnauthorizedPage() {
    return (
        <MainLayout title="Unauthorized">
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-3xl font-bold">Unauthorized Access</h1>
            </div>
        </MainLayout>
    );
}
