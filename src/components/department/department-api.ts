'use server'
import { DepartmentModel } from "@/models/models";
import { getCurrentUser } from "@/services/api";

export type CreateDepartmentDto = Omit<DepartmentModel, 'id'>;


export async function getAllDepartment(): Promise<DepartmentModel []> {
    const session = await getCurrentUser();
    const response = await fetch("http://localhost:5000/api/departments", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        console.log("Fetch fail");
    }
    const data  = await response.json();
    return data;
}

export async function createNewDepartment(values: CreateDepartmentDto ): Promise<DepartmentModel> {
    const session = await getCurrentUser();
    const response = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
    });
    if (!response.ok) {
        console.error("Fetch fail");
    }
    const data = await response.json();
    return data.department;
}

export async function deleteDepartment(id: number) {
    const session = await getCurrentUser();
    const response = await fetch(`http://localhost:5000/api/departments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session?.token}`,
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    if (!response.ok) {
        console.error(data.message);
    }
    return data.message
}


