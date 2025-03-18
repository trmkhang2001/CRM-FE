import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from 'sonner';
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { cn } from '@/lib/utils';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import PageHeader from './page-header';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hệ thống quản lý nhân viên',
  description: 'Ứng dụng quản lý nhân viên hiệu quả',
};

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cn(inter.className, "flex min-h-screen")}>
        <AuthProvider>
          <SidebarProvider>
            <div className="flex flex-1">
              <AppSidebar />
              <ProtectedRoute>
                <main className="flex-1">
                  <PageHeader />
                  {children}
                </main>
              </ProtectedRoute>
            </div>
          </SidebarProvider>
          <Toaster richColors />
        </AuthProvider>
      </body>
    </html>
  );
}

