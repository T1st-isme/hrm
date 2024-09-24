import NavbarComponent from "./Navbar/Navbar";
import SidebarComponent from "./Sidebar/Sidebar";

export default function MainLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <SidebarComponent />
            <div className="flex flex-col flex-1">
                <NavbarComponent title={title} />
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
