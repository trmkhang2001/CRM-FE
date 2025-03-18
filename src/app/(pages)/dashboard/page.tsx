'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Thông tin người dùng</CardTitle>
                        <CardDescription>Thông tin tài khoản của bạn</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p><strong>Tên:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Vai trò:</strong> {user?.role === 'admin' ? 'Quản trị viên' : 'Người dùng'}</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Thống kê</CardTitle>
                        <CardDescription>Tổng quan về hệ thống</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Đây là nơi hiển thị thống kê của hệ thống</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Hoạt động gần đây</CardTitle>
                        <CardDescription>Các hoạt động trong hệ thống</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Đây là nơi hiển thị các hoạt động gần đây</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
