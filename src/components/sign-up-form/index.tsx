import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useEmailState, useSignUp } from "hooks/signUp";
import { useGetToken } from "hooks/login";
import { useSetLoginState } from "hooks/login";
import { usePathState } from "hooks/path";
import { InputComp } from "ui/input";
import css from "./index.css";

export function SignUpForm() {
	const newEmailStatus = useEmailState();
	const path = usePathState();
	const [wrongPassword, setWrongPassword] = useState(false);
	const newEmail = localStorage.getItem("new-email");
	const setLogin = useSetLoginState();
	const navigate = useNavigate();
	useEffect(() => {
		if (!newEmailStatus) {
			navigate("/");
		}
	}, [newEmailStatus]);

	async function handleSubmit(e) {
		e.preventDefault();
		const name = e.target.name.value;
		const password = e.target.password.value;
		const passwordTwo = e.target.otherPassword.value;
		if (name == "" || password == "" || passwordTwo == "") {
			alert("Completa todos los campos");
		} else {
			if (password != passwordTwo) {
				setWrongPassword(true);
			} else {
				const signUpRes = await useSignUp(newEmail, name, password).then(
					(res) => {
						useGetToken(res.email, password).then((res) => {
							localStorage.setItem("email", newEmail);
							localStorage.setItem("token", res.token);
							setLogin({ logged: true });
							navigate(path);
						});
					}
				);
			}
		}
	}

	return (
		<div>
			<form className={css.form} onSubmit={handleSubmit}>
				<h2>Tu nombre</h2>
				<InputComp type="name" name="name" />
				<h2>Contraseña</h2>
				<InputComp type="password" name="password" />
				<h2>Repetir contraseña</h2>
				<InputComp type="password" name="otherPassword" />
				<button className={css.button}>Siguiente</button>
			</form>
			{wrongPassword ? (
				<div className={css["wrong-password"]}>
					Las contraseñas no coinciden
				</div>
			) : (
				<div />
			)}
		</div>
	);
}
