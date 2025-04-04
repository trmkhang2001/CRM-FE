"use client"

import { ColumnDef } from "@tanstack/react-table"
import { StaffModel } from "@/models/employeeModel";
import { Badge } from "@/components/ui/badge";
import { deleteEmployee } from "@/services/employeeService";
import { deleteEmployeeStore } from "@/components/stores/employees-store";
import { CreateNewEmployeesForm } from "@/components/employees/create-new-employees-form";
import { ActionCell } from "@/components/common/GenericActionCell";
import { toast } from "sonner";



const handleDelete = async (id: number) => {
    try {
        const data = await deleteEmployee(id)
        deleteEmployeeStore(id);
    }
    catch (error) {
        toast.error('Xóa nhân viên không thành công, hãy xóa lương của nhân viên trước', {
        })
}
};

export const employeeColumns: ColumnDef<StaffModel>[] = [
    {
        accessorKey: "fullName",
        header: "Họ tên",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Số điện thoại",
    },
    {
        accessorKey: "position",
        header: "Chức vụ",
    },
    {
        accessorKey: "Department",
        header: "Phòng ban",
        cell: ({ row }) => {
            const department = row.original.Department;
            return <span>{department?.name || "Không có phòng ban"}</span>; // Sử dụng optional chaining và giá trị mặc định
        },
    },
    {
        accessorKey: "startDate",
        header: "Ngày vào làm",
    },
    {
        accessorKey: "status",
        header: "Trạng thái làm việc",
        cell: ({ row }) => {
            const status = row.original.status; // Lấy giá trị trạng thái
            switch (status) {
                case "active":
                    return <Badge variant="active">Hoạt động</Badge>;
                case "inactive":
                    return <Badge variant="secondary">Không hoạt động</Badge>;
                case "resigned":
                    return <Badge variant="destructive">Từ chức</Badge>;
            }
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const employeeData = row.original
            return (
                <ActionCell
                    employeeData={employeeData}
                    title="Chỉnh sửa nhân viên"
                    name={employeeData.fullName}
                    id={employeeData.id}
                    onDelete={handleDelete}
                    editForm={(onSave) => (
                        <CreateNewEmployeesForm
                            initialData={row.original}
                            onSave={onSave}
                        />
                    )}
                />
            )
        }
    },
]
