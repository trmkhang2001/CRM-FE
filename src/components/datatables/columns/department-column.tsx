"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DepartmentModel } from "@/models/models";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteDepartmentStore } from "@/components/store/department-store";
import { deleteDepartment } from "@/components/department/department-api";
import CreateDialog from "@/components/dialogs/CreateDialog";
import { useState } from "react";
import { CreateNewDepartmentForm } from "@/components/department/CreateNewDepartmentForm";
import { DeleteButton } from "@/components/common/DeleteButton";


export const departmentColumn: ColumnDef<DepartmentModel>[] = [
  {
    accessorKey: "name",
    header: "Tên phòng ban",
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
      const departmentValues = row.original
      const handleDelete = (id: number) => {
        deleteDepartment(id);
        deleteDepartmentStore(id);
      }
      return (
        <div className="flex gap-1 justify-center">
          <Button variant='edit' onClick={() => setIsEditDialogOpen(true)}>
            Edit</Button>
          <CreateDialog open={isEditDialogOpen} setOpen={setIsEditDialogOpen} title="Chỉnh sửa phòng ban">
            <CreateNewDepartmentForm
              initialData={departmentValues}
              onSave={() => setIsEditDialogOpen(false)}
            />
          </CreateDialog>
          <DeleteButton itemName={departmentValues.name} onDelete={handleDelete} id={departmentValues.id} />
        </div>
      )
    }
  },
]
