"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { CreateDepartmentDto, createDepartment } from "../../services/departmentService"
import { addNewDepartmentIntoStore, departmentListStore } from "../stores/department-store"
import { DepartmentModel } from "@/models/employeeModel"

type DepartmentForm = {
    onSave: () => void;
    initialData?: DepartmentModel;
};

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Tên phòng ban có ít nhất 2 ký tự.",
    }),
    description: z.string()
});


export function   CreateNewDepartmentForm({ onSave, initialData }: DepartmentForm) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: initialData?.name || "",
            description: initialData?.description || ""
        },
    })
    //Lam gi sau khi submit
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const departmentData: CreateDepartmentDto = {
                name: values.fullName,
                description: values.description,
            };
            const data = await createDepartment(departmentData);
            toast.success('Thêm phòng ban mới thành công');
            addNewDepartmentIntoStore(data);
            onSave();
        }
        catch {
            toast.error('Thêm mới thất bại', {
                description: 'Vui lòng thử lại sau.',
            });
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên phòng ban</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên phòng ban" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập tên mô tả phòng ban" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
