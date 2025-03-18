import { DepartmentModel } from "@/models/models";
import { proxy, useSnapshot } from "valtio";

export const departmentListStore = proxy({
    departmentList: [] as DepartmentModel []
});
export const setAllDepartmentIntoStore = async (props: DepartmentModel[]) => {
    departmentListStore.departmentList = props;
}

export const addNewDepartmentIntoStore = async (props: DepartmentModel) => {
    departmentListStore.departmentList = [...departmentListStore.departmentList, props];
}

export const deleteDepartmentStore = async (id: number) => {
    departmentListStore.departmentList = departmentListStore.departmentList.filter((item) => item.id !== id);
}

export const useDepartmentStore = () => useSnapshot(departmentListStore);
