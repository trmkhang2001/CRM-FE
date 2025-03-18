"use client"
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import DataTables from "../datatables/DataTable";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateDialog from "../dialogs/CreateDialog";
import { employeesStore, setAllEmployeeIntoStore } from "../store/employees-store";
import { getAllEmployee } from "./employee-api";
import { employeeColumns } from "../datatables/columns/employee-column";
import { CreateNewEmployeesForm } from "./create-new-employees-form";
import { departmentListStore } from "../store/department-store";



export default function EmployeeList() {
    const { employeeList } = useSnapshot(employeesStore);

    const [open, setOpen] = useState(false)

    
    useEffect(() => {
        async function fetchData() {
            const data = await getAllEmployee();
            setAllEmployeeIntoStore(data);
        }
        fetchData();
    }, []);
    return (
        <div>
            <DataTables columns={employeeColumns} data={[...(employeeList || [])]} columnKey="fullName" placeholder="Vui lòng nhập họ và tên..." >
                <Button onClick={() => setOpen(true)}><Plus /> Thêm mới nhân viên </Button>
                <CreateDialog open={open} setOpen={setOpen} title="Thêm mới nhân viên">
                    <CreateNewEmployeesForm onSave={()=>setOpen(false)}></CreateNewEmployeesForm>
                </CreateDialog> 
            </DataTables>
        </div>
    )
}
