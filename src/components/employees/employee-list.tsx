"use client"
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import DataTables from "../datatables/DataTable";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateDialog from "../dialogs/CreateDialog";
import { employeesStore, setAllEmployeeIntoStore } from "../stores/employees-store";
import { getAllEmployee, getAllEmployeeByDepartmentAndStatus } from "../../services/employeeService";
import { employeeColumns } from "../datatables/columns/employee-column";
import { CreateNewEmployeesForm } from "./create-new-employees-form";
import { departmentListStore } from "../stores/department-store";
import FilterDropdowns from "./FilterDropdowns";



export default function EmployeeList() {
    const { employeeList } = useSnapshot(employeesStore);
    const [open, setOpen] = useState(false)
    const [departmentId, setDepartment] = useState("")
    const [status, setStatus] = useState("")


    useEffect(() => {
        async function fetchData() {
            const data = await getAllEmployee();
            console.log("getData",data)
            setAllEmployeeIntoStore(data);
        }
        fetchData();
    }, [departmentId,status]);
    return (
        <div>
            <DataTables columns={employeeColumns} data={[...(employeeList || [])]} columnKey="fullName" placeholder="Vui lòng nhập họ và tên..." >
                <Button onClick={() => setOpen(true)}><Plus /> Thêm mới nhân viên </Button>
                <FilterDropdowns
                    onDepartmentChange={setDepartment}
                    onStatusChange={setStatus}
                />
                <CreateDialog open={open} setOpen={setOpen} title="Thêm mới nhân viên">
                    <CreateNewEmployeesForm onSave={() => setOpen(false)}></CreateNewEmployeesForm>
                </CreateDialog>
            </DataTables>
        </div>
    )
}
