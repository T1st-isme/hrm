"use client";

import { useEffect } from "react";
import NavbarComponent from "./Navbar/Navbar";
import SidebarComponent from "./Sidebar/Sidebar";
import { useAuthStore } from "@/state/useAuthStore";

export default function MainLayout({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
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
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}
