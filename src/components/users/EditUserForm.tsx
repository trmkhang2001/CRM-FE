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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { toast } from "sonner"
import { UserModel } from "@/models/userModel"
import { updateUser } from "@/services/userService"
import { updateUserStore } from "../stores/user-store"
type UserFormProps = {
    onSave: () => void;
    initialData?: UserModel;
    isEdit?: boolean;
};


const userSchema = z.object({
    name: z.string().min(1, "Họ và tên là bắt buộc"),
    email: z.string().email("Email không hợp lệ"),
    role: z.string().min(1, "Vai trò là bắt buộc"),
});

const roles = [
    { value: "admin", name: "Admin" },
    { value: "manager", name: "Quản lý" },
    { value: "staff", name: "Nhân viên" },
];

export function EditUserForm({ onSave, initialData, isEdit }: UserFormProps) {
    const form = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: initialData?.name || "",
            email: initialData?.email || "",
            role: initialData?.role || "",
        },
    })

    //Lam gi sau khi submit
    async function onSubmit(values: z.infer<typeof userSchema>) {
        try {
            if (initialData) {
                const userData: UserModel = {
                    id: initialData!.id,
                    name: values.name,
                    email: values.email,
                    role: values.role
                }
                const data = await updateUser(userData);
                updateUserStore(data);
                toast.success('Cập nhập người dùng thành công');
                onSave();

            }
        }
        catch (error) {
            form.setError("email", { message: "Email đã tồn tại" });
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập họ tên người dùng" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Nhập email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tháng</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn vai trò" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {roles.map(month => (
                                        <SelectItem key={month.value} value={month.value}>{month.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
