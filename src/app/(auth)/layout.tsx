import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { cn } from '@/lib/utils';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hệ thống quản lý nhân viên',
  description: 'Ứng dụng quản lý nhân viên hiệu quả',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cn(inter.className, "flex min-h-screen  bg-gray-100")}>
        <AuthProvider>
          <main className="flex-1 p-4">
            {children}
          </main>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}

