import MainLayout from "../components/MainLayout";

export default function AdminPage() {
    return (
        <MainLayout title="Admin Dashboard">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-bold">Users</h2>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-bold">User 1</h3>
                        <p className="text-sm text-gray-500">
                            User 1 description
                        </p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
