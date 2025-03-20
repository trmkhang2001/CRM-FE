"use server"

import { ENDPOINTS } from "@/constants/endpoints";
import { Method } from "@/models/salary";
import { CreateUserDto, UserModel } from "@/models/user";
import { fetchData } from "@/utils/utilsApi";

export async function getAllUser(): Promise<UserModel[]> {
    const data = await fetchData<UserModel[]>(ENDPOINTS.USERS, Method.GET);
    return data;
}

//Admin role
export async function deleteUser(id: number): Promise<string> {
    const data = await fetchData<string>(`${ENDPOINTS.USERS}/${id}`, Method.DELETE);
    return data
}

export async function updateUser(props: UserModel): Promise<UserModel> {
    const data = await fetchData<{message: string; user: UserModel}>(`${ENDPOINTS.USERS}/${props.id}`, Method.PUT, props);
    return data.user;
}

export async function createUser(props: CreateUserDto): Promise<UserModel> {
    const data = await fetchData<{message: string; user: UserModel}>(ENDPOINTS.USERS, Method.POST, props);
    return data.user;
}

