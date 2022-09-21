import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	atom,
	selector,
	useRecoilValue,
	useRecoilState,
	useSetRecoilState,
} from "recoil";
import { getNearbyPets } from "lib";

// export const loggedState = atom({
// 	key: "loggedState",
// 	default: {
// 		logged: false,
// 	},
// });

// const loggedSelector = selector({
// 	key: "loggedSelector",
// 	get: async ({ get }) => {
// 		const valorDeLoggedState = get(loggedState);
// 		console.log("SOY SELECTOR NERVIPET", loggedState);
// 		return loggedState;
// 	},
// });

// export function useLoggedState() {

// 	const logged = localStorage.getItem("logged");
// 	useEffect(() => {
// 		// console.log(logged);
// 		// console.log("algo", algo);
// 	}, [logged]);
// 	return loggedState;
// }
