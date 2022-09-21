import { useState, useEffect } from "react";
import { atom, selector, useRecoilValue, useRecoilState } from "recoil";
import { getNearbyPets } from "lib";

const myLocState = atom({
	key: "myLoc",
	default: { lat: "", lng: "" },
});

const nearbyPetsResults = selector({
	key: "nearbyPetsResults",
	get: async ({ get }) => {
		const valorDeMyLoc = get(myLocState);
		// console.log("SOY SELECTOR NEARBYPET", valorDeMyLoc);

		if (valorDeMyLoc.lat != "") {
			const results = await getNearbyPets(valorDeMyLoc);
			return results;
		} else {
			return [];
		}
	},
});

export function useNearbyPets() {
	function getMyLocation() {
		function success(pos) {
			var crd = pos.coords;
			const lat = crd.latitude;
			const lng = crd.longitude;
			localStorage.setItem("myLoc", JSON.stringify({ lat, lng }));
			setMyLoc({ lat, lng });
		}
		navigator.geolocation.getCurrentPosition(success);
	}
	const [myLoc, setMyLoc] = useRecoilState(myLocState);
	const results = useRecoilValue(nearbyPetsResults);
	// console.log("el valor de myLoc en recoil antes de ser cambiado", myLoc);
	useEffect(() => {
		getMyLocation();
	}, []);
	return results;
}
