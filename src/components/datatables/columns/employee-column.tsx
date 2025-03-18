"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Staff } from "@/models/models";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DeleteButton } from "@/components/common/DeleteButton";
import { deleteEmployee } from "@/components/employees/employee-api";
import { deleteEmployeeStore } from "@/components/store/employees-store";
import { EditButton } from "@/components/common/EditButton";
import { CreateNewEmployeesForm } from "@/components/employees/create-new-employees-form";
import { useState } from "react";

export const employeeColumns: ColumnDef<Staff>[] = [
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
            console.log("Row data:", row.original); // Kiểm tra dữ liệu
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
            const [open, setOpen] = useState(false)
            const employeeData = row.original
            const handleDelete = (id: number) => {
                deleteEmployee(id);
                deleteEmployeeStore(id);
            }
            return (
                <div className="flex gap-1">
                    <EditButton title="Chỉnh sửa nhân viên"  open={open} setOpen={setOpen} >
                        <CreateNewEmployeesForm
                            initialData={employeeData}
                            onSave={() => setOpen(false)}
                        />
                    </EditButton>
                    <DeleteButton itemName={employeeData.fullName} onDelete={handleDelete} id={employeeData.id} />
                </div>
            )
        }
    },
]
