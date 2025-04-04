'use server'
import { ENDPOINTS } from "@/constants/endpoints";
import { StaffModel } from "@/models/employeeModel";
import { Method } from "@/models/salaryModel";
import { fetchData } from "@/utils/utilsApi";

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

export async function getEmployeeById(id: number): Promise<StaffModel> {
    const data = await fetchData<StaffModel>(`${ENDPOINTS.EMPLOYEES}/${id}`, Method.GET);
    return data;
}

export async function getAllEmployee(): Promise<StaffModel[]> {
    const data = await fetchData<StaffModel[]>(ENDPOINTS.EMPLOYEES, Method.GET);
    return data;
}

export async function getAllEmployeeByDepartmentAndStatus(departmentId: string, status: string): Promise<StaffModel[]> {
    const queryParams = new URLSearchParams({departmentId: departmentId, status: status}).toString();
    console.log(queryParams)
    const data = await fetchData<StaffModel[]>(`${ENDPOINTS.EMPLOYEES}/filter?${queryParams}`, Method.GET);
    return data;
}

export async function createEmployee(props: createEmployeeDto): Promise<StaffModel> {
    const data = await fetchData<{ message: string; employee: StaffModel }>(ENDPOINTS.EMPLOYEES, Method.POST, props);
    return data.employee;
}

export async function deleteEmployee(id: number): Promise<string> {
    console.log("id",id)
    const data = await fetchData<string>(`${ENDPOINTS.EMPLOYEES}/${id}`, Method.DELETE);
    return data;
}

export async function updateEmployee(props: updateEmployeeDto): Promise<StaffModel> {
    const data = await fetchData<{ message: string; employee: StaffModel }>(`${ENDPOINTS.EMPLOYEES}/${props.id}`, Method.PUT, props);
    return data.employee;
}

