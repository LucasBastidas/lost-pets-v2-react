import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import css from "./index.css";
import { useLoginState } from "hooks/login";
import { InputComp } from "ui/input";
import { useSetPathState } from "hooks/path";
import {
	userDataState,
	useUpdatePassword,
	useUpdateName,
	useUpdatePasswordAndName,
} from "hooks/user-data";
import { useSwal } from "ui/alert";

export function MyDataForm() {
	const [userData, setUserData] = useRecoilState(userDataState);
	const loginState = useLoginState();

	const setPath = useSetPathState();

	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	useEffect(() => {
		if (token) {
			// console.log("me quedo aca");
		} else {
			setPath("/my-data");
			navigate("/log-in");
		}
	}, [loginState]);

	async function handlerSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const password = e.target.password.value;
		const passwordTwo = e.target.passwordTwo.value;

		if (name == "" && password == "" && passwordTwo == "") {
			useSwal("Error!", "No llenaste ningún campo", "error");
		} else {
			if (name != "" && password == "" && passwordTwo == "") {
				const updateName = await useUpdateName(name, token).then((res) => {
					// console.log("soy res", res.fullName);
					setUserData({ name: res.fullName, id: res.id });
					useSwal("Hecho", "Cambiaste tu nombre a " + res.fullName, "success");
					e.target.reset();
				});
			} else if (name == "" && password != "" && passwordTwo != "") {
				if (password == passwordTwo) {
					const updatePassword = await useUpdatePassword(password, token).then(
						(res) => {
							useSwal("Hecho", "Cambiaste tu password", "success");
						}
					);
				} else {
					useSwal("Error!", "Las contraseñas no son iguales", "error");
				}
			} else if (name != "" && password != "" && passwordTwo != "") {
				if (password == passwordTwo) {
					const update = await useUpdatePasswordAndName(
						password,
						name,
						token
					).then((res) => {
						// console.log(res);

						useSwal("Hecho", "Cambiaste tu nombre y password", "success");
					});
				} else {
					useSwal("Error!", "Las contraseñas no son iguales", "error");
				}
			}
		}
	}

	return (
		<div className={css.root}>
			<form onSubmit={handlerSubmit}>
				<h2>Nombre</h2>
				<InputComp placeholder={userData.name} type="name" name="name" />
				<h2>Nueva contraseña</h2>
				<InputComp type="password" name="password" />
				<h2>Repetir nueva contraseña</h2>
				<InputComp type="password" name="passwordTwo" />
				<button className={css.button}>Guardar</button>
			</form>
		</div>
	);
}
