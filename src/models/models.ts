export interface Staff {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  basicSalary: number;
  startDate: string;
  status: string;
  departmentId: number;
  Department: DepartmentModel
}
export interface DepartmentModel {
  id: number,
  name: string,
  description: string,
}

export interface Salary {
  id: number;
  employeeId: number;
  basicSalary: number;
  overtimeSalary: number;
  bonus: number;
  penalty: number;
  allowance: number;
  totalSalary: number;
  month: string;
  year: string;

  // FE fields
  employeeName?: string;
}