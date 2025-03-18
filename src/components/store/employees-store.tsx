import { Staff } from "@/models/models";
import { proxy, useSnapshot } from "valtio";

export const employeesStore = proxy({
    employeeList: [] as Staff[]
});
export const setAllEmployeeIntoStore = async (props: Staff[]) => {
    employeesStore.employeeList = props;
}

export const addNewEmployeeIntoStore = async (props: Staff) => {
    employeesStore.employeeList = [...employeesStore.employeeList, props];
}

export const deleteEmployeeStore = async (id: number) => {
    employeesStore.employeeList = employeesStore.employeeList.filter((item) => item.id !== id);
}

export const updateEmployeeStore = (updatedEmployee: Staff) => {
    const index = employeesStore.employeeList.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
        employeesStore.employeeList[index] = updatedEmployee;
    }
};


export const useEmployeesStore = () => useSnapshot(employeesStore);
