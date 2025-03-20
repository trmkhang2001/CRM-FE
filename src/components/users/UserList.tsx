"use client"
import { useEffect, useState } from "react";
import CreateDialog from "../dialogs/CreateDialog";
import DataTables from "../datatables/DataTable";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createUser, deleteUser, getAllUser, updateUser } from "@/services/userService";
import { CreateUserDto, UserModel } from "@/models/user";
import { ColumnDef } from "@tanstack/react-table";
import { SalaryForm } from "../salarys/SalaryForm";
import { EditButton } from "../common/EditButton";
import { DeleteButton } from "../common/DeleteButton";
import { UserForm } from "./UserForm";
import { deleteUserStore, setAllUserIntoStore, useUserStore } from "../store/user-store";
import { EditUserForm } from "./EditUserForm";


export default function UserDetailPage() {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const { userList } = useUserStore();


    useEffect(() => {
        const fetchSalaryRecords = async () => {
            try {
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

    const handleDelete = async (id: number) => {
        const data = await deleteUser(id)
        deleteUserStore(id);
    };

    const userColumns: ColumnDef<UserModel>[] = [
        {
            accessorKey: "name",
            header: "Họ và tên",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Vai trò",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const userValue = row.original;
                return (
                    <div className="flex gap-1">
                        <EditButton title="Chỉnh sửa thông tin người dùng" open={editOpen} setOpen={setEditOpen}>
                            <EditUserForm isEdit={true} initialData={userValue} onSave={() => setEditOpen(false)} />
                        </EditButton>
                        <DeleteButton itemName={userValue.name} onDelete={() => handleDelete(userValue.id)} id={userValue.id} />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <DataTables columns={userColumns} data={[...userList]} columnKey="name" placeholder="Vui lòng nhập họ và tên...">
                {/* <Button onClick={() => setOpen(true)}><Plus /> Thêm mới người dùng </Button>
                <CreateDialog open={open} setOpen={setOpen} title="Thêm mới người dùng">
                    <UserForm onSave={() => setOpen(false)} isEdit={false} />
                </CreateDialog> */}
            </DataTables>
        </div>
    );
}