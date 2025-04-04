import { ActionCell } from "@/components/common/GenericActionCell";
import { deleteUserStore } from "@/components/stores/user-store";
import { EditUserForm } from "@/components/users/EditUserForm";
import { UserModel } from "@/models/userModel";
import { deleteUser } from "@/services/userService";
import { ColumnDef } from "@tanstack/react-table";

const handleDelete = async (id: number) => {
    const data = await deleteUser(id)
    deleteUserStore(id);
};

export const userColumns: ColumnDef<UserModel>[] = [
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
                <ActionCell
                    employeeData={userValue}
                    title="Chỉnh sửa người dùng"
                    name={userValue.name}
                    id={userValue.id}
                    onDelete={handleDelete}
                    editForm={(onSave) => (
                        <EditUserForm
                            initialData={row.original}
                            onSave={onSave}
                        />
                    )}
                />
            );
        },
    },
];