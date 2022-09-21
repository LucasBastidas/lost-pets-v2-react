import { useState, useEffect } from "react";
import { atom, selector, useRecoilValue, useRecoilState } from "recoil";
import { getMyReportPets } from "lib/userReportedPets";
import { updateMyReportedPet } from "lib/postAndUpdatePets";

export const tokenState = atom({
	key: "token",
	default: "",
});

export const myPetsState = atom({
	key: "myPets",
	default: [],
});

export async function useMyReportedPets() {
	const [token, setToken] = useRecoilState(tokenState);
	const [pets, setPets] = useRecoilState(myPetsState);

	useEffect(() => {
		if (token != "") {
			// console.log("agregare las pets");

			const res = getMyReportPets(token).then((data) => {
				// console.log("data", data);
				setPets(data);
			});
		}
	}, [token]);
}

export async function useUpdateMyReportedPet(
	token,
	id,
	name?,
	description?,
	imageUrl?,
	lat?,
	lng?,
	ubication?
) {
	const res = await updateMyReportedPet(
		token,
		id,
		name,
		description,
		imageUrl,
		lat,
		lng,
		ubication
	);
	return res;
}
