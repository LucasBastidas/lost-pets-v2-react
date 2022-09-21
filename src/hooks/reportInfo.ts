import { getReportPetEmail, sendReportPetEmail } from "lib";
import {
	atom,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";

export const petEmail = atom({
	key: "petEmail",
	default: "",
});

export const usePetEmail = () => useRecoilValue(petEmail);
export const useSetPetEmail = () => useSetRecoilState(petEmail);

export async function useGetReportEmail(id) {
	const res = await getReportPetEmail(id);

	// console.log("soy res:", res);
	return res;
}

export async function useSendReport(name, tel, message, petReported, petEmail) {
	const res = await sendReportPetEmail(
		name,
		tel,
		message,
		petReported,
		petEmail
	);
	return res;
}
