// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/api';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

// Khởi tạo giá trị mặc định cho context thay vì undefined
const defaultValue: AuthContextType = {
    user: null,
    loading: true,
    login: async () => { },
    register: async () => { },
    logout: () => { },
    isAuthenticated: false,
    isAdmin: false
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const loadUserFromLocalStorage = () => {
            const user = authService.getCurrentUser();
            if (user) {
                setUser(user);
            }
            setLoading(false);
        };

        loadUserFromLocalStorage();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            const data = await authService.login({ email, password });
            setUser(data.user);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string, role: string) => {
        try {
            setLoading(true);
            await authService.register({ name, email, password, role });
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        localStorage.removeItem("user");
        setUser(null);
        router.push('/login');
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}