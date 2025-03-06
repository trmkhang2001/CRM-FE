// src/components/auth/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push(`/login?redirect=${pathname}`);
            } else if (adminOnly && !isAdmin) {
                router.push('/dashboard');
            }
        }
    }, [isAuthenticated, isAdmin, loading, router, pathname, adminOnly]);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen" > Loading...</div>;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (adminOnly && !isAdmin) {
        return null;
    }

    return <>{children} </>;
}