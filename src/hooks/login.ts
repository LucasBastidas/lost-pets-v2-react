import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	atom,
	selector,
	useRecoilValue,
	useRecoilState,
	useSetRecoilState,
} from "recoil";
import { checkUserEmail, getToken } from "lib/logInSignUp";

export async function useLogIn(emailParam) {
	const res = await checkUserEmail(emailParam);
	if (res == null) {
		// console.log("es null(no registrado)", res);
		return {
			registrado: false,
			email: res,
		};
	} else {
		// console.log("es email registrado", res);
		return {
			registrado: true,
			email: res,
		};
	}
}

//OBTENER EL TOKEN (LOGIN)
export async function useGetToken(email, password) {
	const res = await getToken(email, password);
	if (res.token) {
		// Devuelve token
		return { token: res.token };
	} else {
		//Devuelve ERROR
		return res;
	}
}

export const loginState = atom({
	key: "loginState",
	default: {
		logged: false,
	},
});

export const useLoginState = () => useRecoilState(loginState);
export const useLoginValue = () => useRecoilValue(loginState);
export const useSetLoginState = () => useSetRecoilState(loginState);
