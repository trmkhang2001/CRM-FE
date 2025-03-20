import { cookies } from "next/headers";

export async function fetchData<T>(
    url: string,
    method: string,
    body?: unknown
): Promise<T> {
    // Lấy token từ cookies
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        throw new Error("Token not found");
    }

    // Cấu hình request
    const config: RequestInit = {
        method,
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
    if (method !== "GET" && method !== "DELETE" && body) {
        config.body = JSON.stringify(body);
    }
    const response = await fetch(url, config);
    if (!response.ok) {
        const errorData = await response.json();
        console.log("responseData", errorData)
        throw new Error(errorData.message || "Failed to fetch data");
    }
    const responseData = await response.json()
    console.log("responseData",responseData)
    return responseData;
}