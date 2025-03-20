import { SalaryModel } from "@/models/salaryModel";
import { proxy, useSnapshot } from "valtio";

export const salaryStore = proxy({
    salaryList: [] as SalaryModel[]
});
export const setAllSalaryIntoStore = (props: SalaryModel[]) => {
    salaryStore.salaryList = props;
}

export const addNewSalaryIntoStore = (props: SalaryModel) => {
    salaryStore.salaryList.push(props);  // mutable update
};


export const deleteSalaryStore = (id: number) => {
    salaryStore.salaryList = salaryStore.salaryList.filter((item) => item.id !== id);
    console.log("salaryStore.salaryList",salaryStore.salaryList)
}

export const updateSalaryStore = (updatedSalary: SalaryModel) => {
    const index = salaryStore.salaryList.findIndex(emp => emp.id === updatedSalary.id);
    if (index !== -1) {
        salaryStore.salaryList[index] = updatedSalary;
    }
};

export const useSalaryStore = () => useSnapshot(salaryStore);
