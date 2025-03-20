export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const ENDPOINTS = {
  EMPLOYEES: `${API_BASE_URL}/api/employees`,
  SALARIES: `${API_BASE_URL}/api/salaries`,
  USERS: `${API_BASE_URL}/api/users`,
  DEPARTMENTS: `${API_BASE_URL}/api/departments`,
};