import MainLayout from "../../components/MainLayout";

export default function Dashboard() {
    return (
        <MainLayout title="Dashboard">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Total Employees
                    </h2>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        735
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Today&apos;s Attendance
                    </h2>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        97%
                    </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Leave Employees
                    </h2>
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        23
                    </p>
                </div>
            </div>
        </MainLayout>
    );
}
