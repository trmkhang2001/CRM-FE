// src/services/api.ts
'use server'
import axios from 'axios';
import { cookies } from 'next/headers'

export namespace CurrentUserResponse {
    export type User = {
      id: number;
      email: string;
      name: string;
    }
  
    export type Token = string;
  }

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor để gắn token vào mỗi request
api.interceptors.request.use(
    async (config) => {
        const cookieStore = await cookies();
        const token = cookieStore.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export async function register(userData: { name: string; email: string; password: string; role: string }) {
    const response = await api.post('/api/auth/register', userData);
    return response.data;
}

export async function login(credentials: { email: string; password: string }) {
    const response = await api.post('/api/auth/login', credentials);
    if (response.data.token) {
        const cookieStore = await cookies();
        cookieStore.set('token', response.data.token);
        console.log("token :", response.data.token)
        cookieStore.set('user', JSON.stringify(response.data.user))
    }
    return response.data;
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    cookieStore.delete('user');
}

export async function getCurrentUser() {
    const cookieStore = await cookies();
    const userStr = cookieStore.get('user');
    const token = cookieStore.get('token')?.value;

    if (userStr?.value && token) {
        const user = JSON.parse(userStr.value);
        return { user, token };
    }
    return null;
}

export default api;