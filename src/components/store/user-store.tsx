import { UserModel } from "@/models/user";
import { proxy, useSnapshot } from "valtio";

export const userStore = proxy({
    userList: [] as UserModel[]
});
export const setAllUserIntoStore = (props: UserModel[]) => {
    userStore.userList = props;
}

export const createUserIntoStore = (props: UserModel) => {
    userStore.userList.push(props);  // mutable update
};

export const deleteUserStore = (id: number) => {
    userStore.userList = userStore.userList.filter((item) => item.id !== id);
}

export const updateUserStore = (updatedUser: UserModel) => {
    const index = userStore.userList.findIndex(emp => emp.id === updatedUser.id);
    if (index !== -1) {
        userStore.userList[index] = updatedUser;
    }
};

export const useUserStore = () => useSnapshot(userStore);
