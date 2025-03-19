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
import { CreateSalaryDto, Salary, UpdateSalaryDto } from "@/models/salary"
import { createSalary, updateSalary } from "@/services/salaryService"
import { addNewSalaryIntoStore, updateSalaryStore, useSalaryStore } from "../store/salary-store"
type SalaryFormProps = {
    onSave: () => void;
    initialData?: Salary;
};

const salaryFormSchema = z.object({
    employeeId: z.string().min(1, {
        message: "MSNV phải là số lớn hơn hoặc bằng 1.",
    }),
    basicSalary: z.string().min(1, {
        message: "Lương cơ bản phải là số nguyên không âm.",
    }),
    overtimeSalary: z.string().min(1, {
        message: "Lương tăng ca phải là số không âm.",
    }),
    bonus: z.string().min(1, {
        message: "Tiền thưởng phải là số không âm.",
    }),
    penalty: z.string().min(1, {
        message: "Tiền phạt phải là số không âm.",
    }),
    allowance: z.string().min(1, {
        message: "Phụ cấp phải là số không âm.",
    }),
    month: z.string().min(1, {
        message: "Tháng không được để trống",
    }),
    year: z.string().min(4, {
        message: "Năm không được để trống",
    }),
});
const months = [
    { value: 1, name: "Tháng 1" },
    { value: 2, name: "Tháng 2" },
    { value: 3, name: "Tháng 3" },
    { value: 4, name: "Tháng 4" },
    { value: 5, name: "Tháng 5" },
    { value: 6, name: "Tháng 6" },
    { value: 7, name: "Tháng 7" },
    { value: 8, name: "Tháng 8" },
    { value: 9, name: "Tháng 9" },
    { value: 10, name: "Tháng 10" },
    { value: 11, name: "Tháng 11" },
    { value: 12, name: "Tháng 12" },
];


export function SalaryForm({ onSave, initialData }: SalaryFormProps) {
    const {salaryList} = useSalaryStore();
    const form = useForm<z.infer<typeof salaryFormSchema>>({
        resolver: zodResolver(salaryFormSchema),
        defaultValues: {
            employeeId: initialData?.employeeId.toString() || "",
            basicSalary: initialData?.basicSalary.toString() || "",
            overtimeSalary: initialData?.overtimeSalary.toString() || "",
            bonus: initialData?.bonus.toString() || "",
            penalty: initialData?.penalty.toString() || "",
            allowance: initialData?.allowance.toString() || "",
            month: initialData?.month.toString() || "",
            year: initialData?.year.toString() || "",
        },
    })

    //Lam gi sau khi submit
    async function onSubmit(values: z.infer<typeof salaryFormSchema>) {
        try {
            if (initialData) {
                const salaryDataEdit: UpdateSalaryDto = {
                    id: initialData.id,
                    basicSalary: parseInt(values.basicSalary, 10),
                    overtimeSalary: parseInt(values.overtimeSalary, 10),
                    bonus: parseInt(values.bonus, 10),
                    penalty: parseInt(values.penalty, 10),
                    allowance: parseInt(values.allowance, 10)
                };
                const data = await updateSalary(salaryDataEdit)
                updateSalaryStore(data);
                toast.success('Cập nhập nhân viên thành công');
                onSave();
                console.log("salaryList", salaryList)
                console.log("data", data)
            }
            else {
                const salaryDataCreate: CreateSalaryDto = {
                    employeeId: parseInt(values.employeeId, 10),
                    basicSalary: parseInt(values.basicSalary, 10),
                    overtimeSalary: parseInt(values.overtimeSalary, 10),
                    bonus: parseInt(values.bonus, 10),
                    penalty: parseInt(values.penalty, 10),
                    allowance: parseInt(values.allowance, 10),
                    month: values.month,
                    year: values.year
                };

                const data = await createSalary(salaryDataCreate);

                addNewSalaryIntoStore(data);
                toast.success('Thêm nhân viên mới thành công')
                onSave();
                console.log("salaryList", salaryList)
                console.log("data", data)

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
                    name="employeeId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mã số nhân viên</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập mã số nhân viên" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="basicSalary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lương cơ bản</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập lương cơ bản" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="overtimeSalary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lương tăng ca</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập lương tăng ca" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bonus"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lương thưởng</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập lương thưởng" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="penalty"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Khoản phạt</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập khoản phạt" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="allowance"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phụ cấp khác</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập phụ cấp khác" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tháng</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn tháng" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {months.map(month => (
                                        <SelectItem key={month.value} value={month.value.toString()}>{month.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Năm</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập năm" {...field} />
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
