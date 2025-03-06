// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import GuestRoute from '@/components/auth/GuestRoute';

const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const { login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const redirect = searchParams.get('redirect') || '/dashboard';

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        try {
            setIsLoading(true);
            await login(data.email, data.password);
            toast.success('Đăng nhập thành công', {
                description: 'Chào mừng bạn quay trở lại',
            });
        } catch (error) {
            console.error(error);
            toast.error('Đăng nhập thất bại', {
                description: 'Email hoặc mật khẩu không chính xác',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GuestRoute>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-2xl">Đăng nhập</CardTitle>
                        <CardDescription>Đăng nhập để quản lý nhân viên</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" {...register('email')} />
                                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Mật khẩu</Label>
                                <Input id="password" type="password" {...register('password')} />
                                {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 mt-4">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                            </Button>
                            <p className="text-sm text-center">
                                Chưa có tài khoản?{' '}
                                <Link href="/register" className="text-blue-500 hover:underline">
                                    Đăng ký
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </GuestRoute>
    );
}