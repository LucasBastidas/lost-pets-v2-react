import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { signUp } from "lib/logInSignUp";
import { getToken } from "lib/logInSignUp";

//SE USA PARA SABER SI HAY NUEVO EMAIL PARA REGISTRAR
const newEmailState = atom({
	key: "newEmailState",
	default: false,
});

export const useEmailState = () => useRecoilValue(newEmailState);
export const useSetEmailState = () => useSetRecoilState(newEmailState);

export async function useSignUp(
	email: string,
	fullName: string,
	password: string
) {
	const signUpRes = await signUp(email, fullName, password);
	return signUpRes;
}
