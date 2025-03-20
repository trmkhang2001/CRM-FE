import { StaffModel } from "@/models/employeeModel";
import { proxy, useSnapshot } from "valtio";

export const employeesStore = proxy({
    employeeList: [] as StaffModel[]
});
export const setAllEmployeeIntoStore = async (props: StaffModel[]) => {
    employeesStore.employeeList = props;
}

export const addNewEmployeeIntoStore = async (props: StaffModel) => {
    employeesStore.employeeList = [...employeesStore.employeeList, props];
}

export const deleteEmployeeStore = async (id: number) => {
    employeesStore.employeeList = employeesStore.employeeList.filter((item) => item.id !== id);
}

export const updateEmployeeStore = (updatedEmployee: StaffModel) => {
    const index = employeesStore.employeeList.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
        employeesStore.employeeList[index] = updatedEmployee;
    }
};


export const useEmployeesStore = () => useSnapshot(employeesStore);
