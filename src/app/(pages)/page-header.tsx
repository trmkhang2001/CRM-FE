'use client'

import { Button } from "@/components/ui/button";
import { NavUser } from "@/components/user/nav-user";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";


const PageHeader = () => {
    const { user, logout1, isAuthenticated } = useAuth();

    return (
        <header className="bg-white  p-4 flex justify-between items-center ring-1">
            {/* Logo hoặc tên ứng dụng */}
            <div className="flex items-center">
                <h1 className="text-xl font-bold text-red">HỆ THỐNG QUẢN LÝ NHÂN VIÊN</h1>
            </div>

            {/* Menu điều hướng */}
            <nav className="flex items-center space-x-4">
                <NavUser userInformation={user} />
            </nav>
        </header>
    );
};

export default PageHeader;