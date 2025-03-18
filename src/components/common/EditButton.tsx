import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateDialog from "@/components/dialogs/CreateDialog";

interface EditButtonProps {
    children: React.ReactNode; // Thêm dòng này để nhận children
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const EditButton = ({ children, title, open, setOpen }: EditButtonProps) => {
    return (
        <>
            <Button variant='edit' onClick={() => setOpen(true)}>
                Edit
            </Button>
            <CreateDialog open={open} setOpen={setOpen} title={title}>
                {children}
            </CreateDialog>
        </>
    );
};