"use client"
import { useEffect, useState } from "react";
import CreateDialog from "../dialogs/CreateDialog";
import DataTables from "../datatables/DataTable";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { getAllUser,  } from "@/services/userService";
import { UserForm } from "./UserForm";
import { setAllUserIntoStore, useUserStore } from "../stores/user-store";
import { getCurrentUser } from "@/services/api";
import NotFoundPage from "@/app/(pages)/not-found";
import { userColumns } from "../datatables/columns/user-column";


export default function UserDetailPage() {
    const [open, setOpen] = useState(false);
    const { userList } = useUserStore();
    const [isStaff, setIsStaff] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSalaryRecords = async () => {
                try {
                    const currentUser = await getCurrentUser();
                    const role = currentUser?.user.role;
                    if (role === "staff") {
                        setIsStaff(true);
                        setLoading(false);
                        return;
                    }
                    setLoading(false);
                    const getUser = await getAllUser();
                    setAllUserIntoStore(getUser);
                    toast.success('Dữ liệu user đã được tải thành công.');
                } catch (error) {
                    console.error(error);
                    toast.error('Lỗi khi tải dữ liệu user.');
                }
            
        };
        fetchSalaryRecords();
    }, []);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (isStaff) {
        return <NotFoundPage />;
    }

    return (
        <div>
            <DataTables columns={userColumns} data={[...userList]} columnKey="name" placeholder="Vui lòng nhập họ và tên...">
                <Button onClick={() => setOpen(true)}><Plus /> Thêm mới người dùng </Button>
                <CreateDialog open={open} setOpen={setOpen} title="Thêm mới người dùng">
                    <UserForm onSave={() => setOpen(false)} isEdit={false} />
                </CreateDialog>
            </DataTables>
        </div>
    );
}