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

type GenericFormProps<T extends z.ZodType<any, any>> = {
    schema: T;
    defaultValues: z.infer<T>;
    onSubmit: (values: z.infer<T>) => Promise<void>;
    onSave: () => void;
    fields: {
        name: z.infer<T>;
        label: string;
        placeholder: string;
    }[];
    isEdit?: boolean;
};
export function GenericForm<T extends z.ZodType<any, any>>({
    schema,
    defaultValues,
    onSubmit,
    onSave,
    fields,
    isEdit = false,
}: GenericFormProps<T>) {
    const form = useForm<z.infer<T>>({
        resolver: zodResolver(schema),
        defaultValues,
    });

    async function handleSubmit(values: z.infer<T>) {
        try {
            await onSubmit(values);
            toast.success(isEdit ? 'Cập nhật thành công' : 'Thêm mới thành công');
            onSave();
        } catch {
            toast.error(isEdit ? 'Cập nhật thất bại' : 'Thêm mới thất bại', {
                description: 'Vui lòng thử lại sau.',
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                {fields.map((field) => (
                    <FormField
                        key={String(field.name)}
                        control={form.control}
                        name={field.name}
                        render={({ field: formField }) => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    <Input placeholder={field.placeholder} {...formField} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit">{isEdit ? "Cập nhật" : "Tạo mới"}</Button>
            </form>
        </Form>
    );
}

