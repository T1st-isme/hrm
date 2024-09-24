"use client";

import { Sidebar } from "flowbite-react";

export default function SidebarComponent() {
    return (
        <Sidebar>
            <Sidebar.Logo
                href="/"
                img="https://flowbite.com/docs/images/logo.svg"
                imgAlt="Flowbite logo"
            >
                Flowbite
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="/admin/dashboard">
                        Dashboard
                    </Sidebar.Item>
                    <Sidebar.Item href="/inbox">Inbox</Sidebar.Item>
                    <Sidebar.Item href="/calendar">
                        Calendar & Todos
                    </Sidebar.Item>
                    <Sidebar.Item href="/jobs">Jobs</Sidebar.Item>
                    <Sidebar.Item href="/admin/department">
                        Department
                    </Sidebar.Item>
                    <Sidebar.Item href="/admin/employee">Employee</Sidebar.Item>
                    <Sidebar.Item href="/admin/payroll">Payroll</Sidebar.Item>
                    <Sidebar.Item href="/admin/request">Request</Sidebar.Item>
                    <Sidebar.Item href="/admin/settings">Settings</Sidebar.Item>
                    <Sidebar.Item href="/admin/help">Help Centre</Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
