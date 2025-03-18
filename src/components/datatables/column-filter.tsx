import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";

type ColumnFilterProps = {
    columnKey: string;
    table: Table<any>; 
    placeholder?: string;
};

export function ColumnFilter({ columnKey, table, placeholder }: ColumnFilterProps) {
    return (
        <Input
            placeholder={placeholder || "Vui lòng nhập..."}
            value={(table.getColumn(columnKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(columnKey)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
        />
    );
}