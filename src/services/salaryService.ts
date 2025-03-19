"use server"

import { ENDPOINTS } from "@/constants/endpoints";
import { CreateSalaryDto, Method, Salary, UpdateSalaryDto } from "@/models/salary";
import { fetchData } from "@/utils/utilsApi";

export async function getSalaryFromMonthYear(month: number, year: number): Promise<Salary[]> {
    const queryParams = new URLSearchParams({ month: month.toString(), year: year.toString() }).toString();
    const data = await fetchData<Salary[]>(`${ENDPOINTS.SALARIES}?${queryParams}`, Method.GET);
    return data;
}

export async function deleteSalary(id: number): Promise<string> {
    const data = await fetchData<string>(`${ENDPOINTS.SALARIES}/${id}`, Method.DELETE);
    return data
}

export async function updateSalary(props: UpdateSalaryDto): Promise<Salary> {
    const data = await fetchData<Salary>(`${ENDPOINTS.SALARIES}/${props.id}`, Method.PUT, props);
    return data;
}

export async function createSalary(props: CreateSalaryDto): Promise<Salary> {
    const data = await fetchData<Salary>(ENDPOINTS.SALARIES, Method.POST, props);
    return data;
}

