"use client"
import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react";
import { DeleteButton } from "@/components/common/DeleteButton";
import { SalaryModel } from "@/models/salaryModel";
import { SalaryForm } from "@/components/salarys/SalaryForm";
import { deleteSalary } from "@/services/salaryService";
import { deleteSalaryStore } from "@/components/stores/salary-store";
import { EditButton } from "@/components/common/EditButton";


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
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const salaryValue = row.original
      console.log("salaryValue:", salaryValue)
      const handleDelete = (id: number) => {
        deleteSalary(id);
        deleteSalaryStore(id);
      }
      return (
        <div className="flex gap-1">
          <EditButton title="Chỉnh sửa nhân viên" open={isEditDialogOpen} setOpen={setIsEditDialogOpen} >
            <SalaryForm
              initialData={salaryValue}
              onSave={() => setIsEditDialogOpen(false)}
            />
          </EditButton>
          <DeleteButton itemName={salaryValue.employeeName} onDelete={handleDelete} id={salaryValue.id} />
        </div>
      )
    }
  },
]
