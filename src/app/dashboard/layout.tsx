import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute>
            <SidebarProvider>
                <div className="flex min-h-screen">
                    <AppSidebar />
                    <main className="flex-1 p-4 bg-gray-100">
                        {children}
                    </main>
                </div>
            </SidebarProvider>
        </ProtectedRoute>
    );
}
