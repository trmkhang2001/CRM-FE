"use client"
import { ColumnDef } from "@tanstack/react-table"
import { DepartmentModel } from "@/models/employeeModel";
import { deleteDepartmentStore } from "@/components/stores/department-store";
import { deleteDepartment } from "@/services/departmentService";
import { DeleteButton } from "@/components/common/DeleteButton";

const handleDelete = (id: number) => {
  deleteDepartment(id);
  deleteDepartmentStore(id);
}


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
      const departmentValues = row.original
      return (
        <div className="flex gap-1 justify-center">
          {/* <Button variant='edit' onClick={() => setIsEditDialogOpen(true)}>
            Edit</Button>
          <CreateDialog open={isEditDialogOpen} setOpen={setIsEditDialogOpen} title="Chỉnh sửa phòng ban">
            <CreateNewDepartmentForm
              initialData={departmentValues}
              onSave={() => setIsEditDialogOpen(false)}
            />
          </CreateDialog> */}
          <DeleteButton itemName={departmentValues.name} onDelete={handleDelete} id={departmentValues.id} />
        </div>
      )
    }
  },
]
