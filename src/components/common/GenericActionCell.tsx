"use client"

import { useState } from "react"
import { DeleteButton } from "@/components/common/DeleteButton"
import { EditButton } from "@/components/common/EditButton"

type ActionsCellProps<T = any> = {
    employeeData: T
    editForm: (onSave: () => void) => React.ReactNode 
    title: string,
    name?: string,
    id: number,
    onDelete: (id: number) => void,
}

export const ActionCell = <T,>({
    employeeData,
    editForm,
    title,
    name,
    id,
    onDelete
}: ActionsCellProps<T>) => {
    const [open, setOpen] = useState(false)

    return (
        <div className="flex gap-1">
            <EditButton title={title} open={open} setOpen={setOpen}>
            {editForm(() => setOpen(false))} {/* Truyền hàm onSave vào đây */}
            </EditButton>
            <DeleteButton
                itemName={name}
                onDelete={() => onDelete(id)}
                id={id}
            />
        </div>
    )
}