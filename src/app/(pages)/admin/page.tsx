// src/app/admin/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
    const { user, logout1 } = useAuth();

    return (
        <ProtectedRoute adminOnly>
            <div className="min-h-screen bg-gray-100 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <span>Xin chào, {user?.name}</span>
                            <Button variant="outline" onClick={logout1}>
                                Đăng xuất
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Quản lý người dùng</CardTitle>
                                <CardDescription>Quản lý tài khoản trong hệ thống</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Đây là nơi quản lý người dùng trong hệ thống</p>
                                <Button className="mt-4">Xem danh sách người dùng</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cài đặt hệ thống</CardTitle>
                                <CardDescription>Cấu hình và tùy chỉnh hệ thống</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Đây là nơi cấu hình các thiết lập hệ thống</p>
                                <Button className="mt-4">Cài đặt</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}