'use server'
import { ENDPOINTS } from "@/constants/endpoints";
import { Staff } from "@/models/models";
import { getCurrentUser } from "@/services/api";
import { fetchData } from "@/utils/utilsApi";
import { cookies } from "next/headers";

export type updateEmployeeDto = {
    id: number,
    fullName: string;
    phone: string;
    position: string;
    status: string;
    departmentId: number;
}

export type createEmployeeDto = {
    fullName: string;
    email: string;
    phone: string;
    position: string;
    status: string;
    departmentId: string;
    startDate: string;
}

export async function getEmployeeById(id: number): Promise<Staff> {
    const data = await fetchData<Staff>(`${ENDPOINTS.EMPLOYEES}/${id}`, "GET");
    return data;
    
}
export async function getAllEmployee(): Promise<Staff[]> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    console.log(token);

    if (!token) {
        console.error("Token not found");
        return [];
    }

    const response = await fetch("http://localhost:5000/api/employees", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    if (!response.ok) {
        console.error("Failed to fetch data");
        return [];
    }
    const data: Staff[] = await response.json();
    return data;
}

export async function deleteEmployee(id: number) {
    const session = await getCurrentUser();
    const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
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

export async function updateEmployee(props: updateEmployeeDto): Promise<Staff> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    console.log(token);

    if (!token) {
        console.error("Token not found");
    }

    const response = await fetch(`http://localhost:5000/api/employees/${props.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props)
    });
    if (!response.ok) {
        console.error("Failed to fetch data");
    }
    const data = await response.json();
    return data.employee;
}

export async function createEmployee(props: createEmployeeDto): Promise<Staff> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const response = await fetch('http://localhost:5000/api/employees', {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props)
    });
    if (!response.ok) {
        console.error("Failed to fetch data");
    }
    const data = await response.json();
    return data.employee;
}
