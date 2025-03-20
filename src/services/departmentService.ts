'use server'
import { ENDPOINTS } from "@/constants/endpoints";
import { DepartmentModel } from "@/models/employeeModel";
import { Method } from "@/models/salaryModel";
import { fetchData } from "@/utils/utilsApi";

export type CreateDepartmentDto = Omit<DepartmentModel, 'id'>;

export async function getAllDepartment(): Promise<DepartmentModel[]> {
    const data = await fetchData<DepartmentModel[]>(ENDPOINTS.DEPARTMENTS, Method.GET);
    return data;
}

export async function deleteDepartment(id: number): Promise<string> {
    const data = await fetchData<string>(`${ENDPOINTS.DEPARTMENTS}/${id}`, Method.DELETE);
    return data
}

export async function createDepartment(props: CreateDepartmentDto): Promise<DepartmentModel> {
    const data = await fetchData<{ message: string; department: DepartmentModel }>(ENDPOINTS.DEPARTMENTS, Method.POST, props);
    return data.department;
}

