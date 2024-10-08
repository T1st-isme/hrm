"use client";

import { useEffect } from "react";
import NavbarComponent from "./Navbar/Navbar";
import SidebarComponent from "./Sidebar/Sidebar";
import Breadcrumb from "./breadcumb";
import { useAuthStore } from "@/state/useAuthStore";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function MainLayout({
    children,
    title,
    breadcrumbs = [],
}: {
    children: React.ReactNode;
    title: string;
    breadcrumbs?: BreadcrumbItem[];
}) {
    const checkAuth = useAuthStore((state) => state.checkAuth);

    useEffect(() => {
        console.log("Checking authentication...");
        checkAuth();
    }, [checkAuth]);

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
            <SidebarComponent />
            <div className="flex flex-col flex-1">
                <header className="h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                    <NavbarComponent title={title} />
                </header>
                <div className="px-6 py-2">
                    <Breadcrumb items={breadcrumbs} />
                </div>
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
