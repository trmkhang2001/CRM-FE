export interface Salary {
  id: number;
  employeeId: number;
  basicSalary: number;
  overtimeSalary: number;
  bonus: number;
  penalty: number;
  allowance: number;
  totalSalary?: number;
  month: string;
  year: string;

  // FE fields
  employeeName?: string;
}

  export type CreateSalaryDto = Omit<Salary, 'id' | 'totalSalary'>;

  export type UpdateSalaryDto = Omit<Salary, 'month' | 'year' | 'totalSalary' | 'employeeId'>;

  export  enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }