"use client"
import { useEffect, useState } from "react";
import { salaryColumn } from "../datatables/columns/salary-column";
import CreateDialog from "../dialogs/CreateDialog";
import DataTables from "../datatables/DataTable";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import MonthYearPicker from "./DataPicker";
import { getSalaryFromMonthYear } from "@/services/salaryService";
import { getAllEmployee } from "@/services/employee-api";
import { toast } from "sonner";
import { SalaryForm } from "./SalaryForm";
import { salaryStore, setAllSalaryIntoStore, useSalaryStore } from "../store/salary-store";
import { useSnapshot } from "valtio";

export default function SalaryDetailPage() {
    const snap = useSnapshot(salaryStore)
    const [open, setOpen] = useState(false)
    const [selectedDate, setSelectedDate] = useState(new Date());
    const {salaryList} = useSalaryStore();

    useEffect(() => {
        const fetchSalaryRecords = async () => {
            try {
                const month = selectedDate.getMonth() + 1; // Lấy tháng (1-12)
                const year = selectedDate.getFullYear(); // Lấy năm
                const salaries = await getSalaryFromMonthYear(month, year);
                const employees = await getAllEmployee();
                const salaryWithEmployeeName = salaries.map(salary => {
                    const employee = employees.find(e => e.id === salary.employeeId);
                    return {
                        ...salary,
                        employeeName: employee ? employee.fullName : 'Unknown'
                    };
                });
                setAllSalaryIntoStore(salaryWithEmployeeName)
            }
            catch (error) {
                console.error(error);
                toast.error('Lỗi khi tải dữ liệu lương.');
            }
        };
        fetchSalaryRecords();
    }, [selectedDate]);
    return (
        <div>
            <DataTables columns={salaryColumn} data={[...salaryList]} columnKey="employeeName" placeholder="Vui lòng nhập họ và tên...">
                <MonthYearPicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                <Button onClick={() => setOpen(true)}><Plus /> Thêm mới lương nhân viên </Button>
                <CreateDialog open={open} setOpen={setOpen} title="Thêm mới lương nhân viên">
                    <SalaryForm onSave={() => setOpen(false)}></SalaryForm>
                </CreateDialog>
            </DataTables>
        </div>
    )
}
