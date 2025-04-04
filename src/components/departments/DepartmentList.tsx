"use client"
import { useEffect, useState } from "react";
import { useSnapshot } from "valtio";
import { departmentColumn } from "../datatables/columns/department-column";
import DataTables from "../datatables/DataTable";
import { departmentListStore, setAllDepartmentIntoStore } from "../stores/department-store";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import CreateDialog from "../dialogs/CreateDialog";
import { getAllDepartment } from "../../services/departmentService";
import { CreateNewDepartmentForm } from "./DepartmentForm";


export default function DepartmentDetailPage() {
    const { departmentList } = useSnapshot(departmentListStore);
    const [open, setOpen] = useState(false)

    
    useEffect(() => {
        async function fetchData() {
            const data = await getAllDepartment();
            setAllDepartmentIntoStore(data);
            console.log("datatalbe:", departmentList)
        }
        fetchData();
    }, []);
    return (
        <div>
            <DataTables columns={departmentColumn} data={[...(departmentList || [])]} columnKey="name" placeholder="Vui lòng nhập tên phòng ban...">
                <Button onClick={() => setOpen(true)}><Plus /> Thêm mới phòng ban </Button>
                <CreateDialog open={open} setOpen={setOpen} title="Thêm mới phòng ban">
                    <CreateNewDepartmentForm onSave={()=>setOpen(false)}></CreateNewDepartmentForm>
                </CreateDialog> 
            </DataTables>
        </div>
    )
}
