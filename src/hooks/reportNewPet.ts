import { postNewReport } from "lib/postAndUpdatePets";

//
export async function usePostNewReport(
	token,
	petname,
	description,
	imageUrl,
	lat,
	lng,
	ubication
) {
	const res = await postNewReport(
		token,
		petname,
		description,
		imageUrl,
		lat,
		lng,
		ubication
	);
	console.log("soy res:", res);
	return res;
}
