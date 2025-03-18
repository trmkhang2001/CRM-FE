// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {getCurrentUser, login, logout, register } from '../services/api';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login1: (email: string, password: string) => Promise<void>;
    register1: (name: string, email: string, password: string, role?: string) => Promise<void>;
    logout1: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

// Khởi tạo giá trị mặc định cho context thay vì undefined
const defaultValue: AuthContextType = {
    user: null,
    loading: true,
    login1: async () => { },
    register1: async () => { },
    logout1: () => { },
    isAuthenticated: false,
    isAdmin: false
};

const AuthContext = createContext<AuthContextType>(defaultValue);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUserFromCookie = async () => {
            const currentUser = await getCurrentUser();
            console.log("current:",currentUser);
            if (currentUser) {
                setUser(currentUser.user);
            }
            setLoading(false);
        };

        loadUserFromCookie();
    }, []);

    const login1 = async (email: string, password: string) => {
        try {
            setLoading(true);
            const data = await login({ email, password });
            setUser(data.user);
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register1 = async (name: string, email: string, password: string, role: string = 'staff') => {
        try {
            setLoading(true);
            await register({ name, email, password, role });
            router.push('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout1 = () => {
        logout();
        setUser(null);
        router.push('/login');
    };

    const value = {
        user,
        loading,
        login1,
        register1,
        logout1,
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