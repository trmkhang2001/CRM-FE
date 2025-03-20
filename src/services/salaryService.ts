"use server"

import { ENDPOINTS } from "@/constants/endpoints";
import { CreateSalaryDto, Method, SalaryModel, UpdateSalaryDto } from "@/models/salaryModel";
import { fetchData } from "@/utils/utilsApi";

export async function getSalaryFromMonthYear(month: number, year: number): Promise<SalaryModel[]> {
    const queryParams = new URLSearchParams({ month: month.toString(), year: year.toString() }).toString();
    const data = await fetchData<SalaryModel[]>(`${ENDPOINTS.SALARIES}?${queryParams}`, Method.GET);
    return data;
}

export async function deleteSalary(id: number): Promise<string> {
    const data = await fetchData<string>(`${ENDPOINTS.SALARIES}/${id}`, Method.DELETE);
    return data
}

export async function updateSalary(props: UpdateSalaryDto): Promise<SalaryModel> {
    const data = await fetchData<{message: string, salaryRecord: SalaryModel}>(`${ENDPOINTS.SALARIES}/${props.id}`, Method.PUT, props);
    return data.salaryRecord;
}

export async function createSalary(props: CreateSalaryDto): Promise<SalaryModel> {
    const data = await fetchData<{message: string, salaryRecord: SalaryModel}>(ENDPOINTS.SALARIES, Method.POST, props);
    console.log("SAlaryrecord",data.salaryRecord)
    return data.salaryRecord;
}

