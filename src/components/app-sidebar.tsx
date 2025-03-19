'use clients';
import {Building, ChartArea,CircleDollarSign,ReceiptText, Settings, User } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: ChartArea,
    },
    {
        title: "Quản lý nhân viên",
        url: "/employees",
        icon: User,
    },
    {
        title: "Quản lý phòng ban",
        url: "/department",
        icon: Building,
    },
    {
        title: "Quản lý lương thưởng",
        url: "/salary",
        icon: CircleDollarSign,
    },
    {
        title: "Quản lý người dùng",
        url: "/user",
        icon: User,
    },
    {
        title: "Settings",
        url: "/setting",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
