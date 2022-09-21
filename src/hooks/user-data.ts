import { atom } from "recoil";
import { updateName, updatePassword } from "lib/updateUserData";

export const userDataState = atom({
	key: "userData",
	default: {
		name: "",
		id: "",
	},
});

export async function useUpdateName(newName, token) {
	const res = await updateName(newName, token);
	return res;
}

export async function useUpdatePassword(newPassword: string, token) {
	const res = await updatePassword(newPassword, token);
	return res;
}

//CAMBIAR PASSWORD Y NAME

export async function useUpdatePasswordAndName(newPassword, newName, token) {
	const newNameRes = await useUpdateName(newName, token);
	const newPasswordRes = await updatePassword(newPassword, token);
	console.log({ newNameRes, newPasswordRes });
	return { newNameRes, newPasswordRes };
}
