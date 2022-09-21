//OBTENER USERDATA
export async function getUserData(token, email) {
	const res = await fetch("https://lost-pets-app-v1.herokuapp.com/me", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},
		body: JSON.stringify({
			email,
		}),
	});
	const userData = await res.json();
	// console.log(userData);
	return userData;
}
