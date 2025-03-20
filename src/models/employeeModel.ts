export interface StaffModel {
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

