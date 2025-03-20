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
import { getCurrentUser } from "@/services/api"
import { toast } from "sonner"
import { DepartmentModel, StaffModel } from "@/models/employeeModel"
import { updateEmployeeDto, updateEmployee, createEmployee } from "../../services/employeeService"
import { addNewEmployeeIntoStore, updateEmployeeStore, useEmployeesStore } from "../stores/employees-store"
import { useDepartmentStore } from "../stores/department-store"
import { useEffect, useState } from "react"
import { getAllDepartment } from "../../services/departmentService"
type CreateNewEmployeesFormProps = {
    onSave: () => void;
    initialData?: StaffModel;
};


const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Họ tên phải có ít nhất 2 ký tự.",
    }),
    email: z.string().email({
        message: "Email không hợp lệ.",
    }),
    phone: z.string().min(10, {
        message: "Số điện thoại phải có ít nhất 10 ký tự.",
    }),
    position: z.string().min(1, {
        message: "Chức vụ không được để trống.",
    }),
    departmentId: z.string().min(1, {
        message: "Phòng ban không được để trống.",
    }),
    startDate: z.string().min(1, {
        message: "Ngày vào làm không được để trống.",
    }),
    status: z.string(),
});

export function CreateNewEmployeesForm({ onSave, initialData }: CreateNewEmployeesFormProps) {
    const [department, setDepartment] = useState<DepartmentModel[]>([])
    const {employeeList } = useEmployeesStore();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: initialData?.fullName || "",
            email: initialData?.email || "",
            phone: initialData?.phone || "",
            position: initialData?.position || "",
            departmentId: initialData?.departmentId.toString() || "",
            startDate: initialData?.startDate || "",
            status: initialData?.status || "",
        },
    })

    useEffect(() => {
        async function fetchData() {
            const data = await getAllDepartment();
            setDepartment(data)
        }
        fetchData();
    }, []);
    //Lam gi sau khi submit
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (initialData) {
                const employeeData: updateEmployeeDto = {
                    id: initialData.id,
                    fullName: values.fullName,
                    phone: values.phone,
                    position: values.position,
                    status: values.status,
                    departmentId: parseInt(values.departmentId, 10)
                };
                const data = await updateEmployee(employeeData)
                updateEmployeeStore(data)
                toast.success('Cập nhập nhân viên thành công');
                onSave();
                console.log("data", data)
                console.log("employeeList", employeeList)
            }
            else {
                const data = await createEmployee(values);
                addNewEmployeeIntoStore(data);
                console.log("data", data)
                if (data) {
                    toast.success('Thêm nhân viên mới thành công', {
                    })
                    onSave();
                } else {
                    toast.error('Thêm mới thất bại', {
                    });
                }
            }
        }
        catch (error) {
            console.log(error)
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
                            <FormLabel>Họ tên</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập họ tên" {...field} />
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
                                <Input placeholder="Nhập email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số điện thoại</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập số điện thoại" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Chức vụ</FormLabel>
                            <FormControl>
                                <Input placeholder="Nhập chức vụ" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phòng ban</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn phòng ban" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {department.map((item) => (
                                        <SelectItem key={item.id} value={(item.id).toString()}>
                                            {item.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ngày vào làm</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Trạng thái làm việc</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="active">Hoạt động</SelectItem>
                                    <SelectItem value="inactive">Không hoạt động</SelectItem>
                                    <SelectItem value="resigned">Từ chức</SelectItem>
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
