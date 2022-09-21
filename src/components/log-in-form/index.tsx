import React, { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import css from "./index.css";
import { useLogIn, useGetToken } from "hooks/login";
import { useSetLoginState, useLoginValue } from "hooks/login";
import { usePathState } from "hooks/path";
import { useSetEmailState } from "hooks/signUp";
import { InputComp } from "ui/input";
import { recoverPassword } from "lib/logInSignUp";
import { useSwal } from "ui/alert";

export function LogInForm() {
	const [load, setLoad] = useState(false);
	const [email, setEmail] = useState("");
	const [emailRecover, setEmailRecover] = useState("");
	const [password, setPassword] = useState("");
	const [wrongPassword, setWrongPassword] = useState(false);
	const setNewEmail = useSetEmailState();

	const path = usePathState();

	const loginState = useLoginValue();
	const setLoginState = useSetLoginState();

	const navigate = useNavigate();

	useEffect(() => {
		//SI ESTOY LOGEADO ME LLEVA A LA HOME
		if (loginState.logged) {
			// console.log("LogInForm: estoy logeado, me voy a /");

			navigate("/");
		}
	}, [loginState]);

	function handleOnChange(e) {
		setEmailRecover(e.target.value);
	}

	function useRecoverPassword() {
		if (emailRecover == "") {
			useSwal("Oops", "no ingresaste ningún email", "info");
		} else {
			recoverPassword(emailRecover).then((res) => {
				if (res.respuesta == "valido") {
					useSwal(
						"Hecho",
						"Se te envío una nueva contraseña a tu email",
						"info"
					);
				} else {
					useSwal("Error", "El email ingresado no esta registrado", "error");
				}
			});
		}
	}

	async function handleSubmitEmail(e) {
		e.preventDefault();
		if (e.target.email.value == "") {
			useSwal("👀", "Tenés que ingresar un email", "info");
		} else {
			const email = e.target.email.value;
			//CHECKEA SI ESTOY REGISTRADO
			setLoad(true);
			const emailCheck = await useLogIn(email).then((emailStatus) => {
				setLoad(false);
				if (emailStatus.registrado == false) {
					//SI NO LO ESTOY ME LLEVA A SIGNUP
					// console.log("soy component, no estoy registrado", emailStatus);
					localStorage.setItem("new-email", email);
					setNewEmail(true);
					navigate("/sign-up");
				} else {
					//SI LO ESTOY GUARDA EL EMAIL EN EL STATE DEL COMPONENTE Y PUEDO INGRESAR LA CONTRASEÑA
					setEmail(email);
					// console.log("estoy registrado", emailStatus);
					e.target.reset();
				}
			});
		}
	}
	async function handleSubmitPassword(e) {
		e.preventDefault();
		const password = e.target["my-password"].value;
		setWrongPassword(false);
		if (password == "") {
			useSwal("👀", "No ingresaste tu contraseña", "info");
		} else {
			setLoad(true);
			setWrongPassword(false);
			useGetToken(email, password).then((res) => {
				if (res.error) {
					setLoad(false);
					setWrongPassword(true);
					useSwal("Error", "Contraseña incorrecta", "error");
				} else {
					localStorage.setItem("email", email);
					localStorage.setItem("token", res.token);
					setLoginState({ logged: true });
					navigate(path);
				}
			});
		}
	}

	return (
		<div className={css.root}>
			{email ? (
				<form className={css.form} onSubmit={handleSubmitPassword}>
					<h2 className={css.label}>Ingresá tu Contraseña</h2>
					<InputComp type="password" name="my-password" />
					{load ? (
						<div className={css["spinner-cont"]}>
							<div className={css["lds-spinner"]}>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					) : (
						<button className={css.button}>Ingresar</button>
					)}
					{/* <button className={css.button}>Ingresar</button> */}
				</form>
			) : (
				<form className={css.form} onSubmit={handleSubmitEmail}>
					<h2 className={css.label}>Ingresá tu email</h2>
					<InputComp onChange={handleOnChange} type="email" name="email" />
					{load ? (
						<div className={css["spinner-cont"]}>
							<div className={css["lds-spinner"]}>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</div>
					) : (
						<button className={css.button}>Ingresar</button>
					)}

					<h3 className={css["recover-button"]} onClick={useRecoverPassword}>
						Olvidé mi contraseña
					</h3>
				</form>
			)}
			{wrongPassword ? (
				<div className={css["wrong-password"]}>Contraseña Incorrecta</div>
			) : (
				<div></div>
			)}
		</div>
	);
}
