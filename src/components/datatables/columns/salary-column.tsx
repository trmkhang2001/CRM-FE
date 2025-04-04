"use client"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react";
import { DeleteButton } from "@/components/common/DeleteButton";
import { SalaryModel } from "@/models/salaryModel";
import { SalaryForm } from "@/components/salarys/SalaryForm";
import { deleteSalary } from "@/services/salaryService";
import { deleteSalaryStore } from "@/components/stores/salary-store";
import { EditButton } from "@/components/common/EditButton";
import { ActionCell } from "@/components/common/GenericActionCell";

const handleDelete = async (id: number) => {
    const data = await deleteSalary(id)
    deleteSalaryStore(id);
};

export const salaryColumn: ColumnDef<SalaryModel>[] = [
  {
    accessorKey: "employeeName",
    header: "Họ và tên",
  },
  {
    accessorKey: "basicSalary",
    header: "Lương cơ bản",
  },
  {
    accessorKey: "overtimeSalary",
    header: "Lương tăng ca",
  },
  {
    accessorKey: "bonus",
    header: "Lương thưởng dự án/KPI",
  },
  {
    accessorKey: "penalty",
    header: "Khoản phạt",
  },
  {
    accessorKey: "allowance",
    header: "Phụ cấp",
  },
  {
    accessorKey: "totalSalary",
    header: "Tổng lương thực nhận",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const salaryValue = row.original
      return (
        <ActionCell
          employeeData={salaryValue}
          title="Chỉnh sửa nhân viên"
          name={salaryValue.employeeName}
          id={salaryValue.id}
          onDelete={handleDelete}
          editForm={(onSave) => (
            <SalaryForm
              initialData={row.original}
              onSave={onSave}
            />
          )}
        />
      )
    }
  },
]
