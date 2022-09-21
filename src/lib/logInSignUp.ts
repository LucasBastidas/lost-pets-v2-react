//LLAMADAS A LA API
const API_SERVER = "https://lost-pets-app-v1.herokuapp.com";

// CHEKEA SI EL EMAIL ESTA REGISTRADO

export async function checkUserEmail(email) {
	const emailCheck = await fetch(API_SERVER + "/email-check", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email: email,
		}),
	});
	const data = await emailCheck.json();
	// console.log(data);
	if (data.user === null) {
		console.log("no registrado");
		return data.user;
	} else {
		console.log("SI REGISTRADO");
		return data.user.email;
	}
}

// OBTENER TOKEN

export async function getToken(email, password) {
	const token = await fetch(API_SERVER + "/auth/token", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});
	const tokenData = await token.json();
	return tokenData;
}

//SIGNUP

export async function signUp(
	email: string,
	fullName: string,
	password: string
) {
	const authSignUp = await fetch(API_SERVER + "/auth", {
		method: "post",
		headers: { "content-type": "application/json" },
		body: JSON.stringify({
			email,
			fullName,
			password,
		}),
	});
	const data = await authSignUp.json();
	return data;
	// console.log(data);
}

//RECUPERAR CONTRASEÑA

export async function recoverPassword(email) {
	const recoverPassword = await fetch(API_SERVER + "/recover-password", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify({
			email: email,
		}),
	});
	const data = await recoverPassword.json();

	return data;
}
