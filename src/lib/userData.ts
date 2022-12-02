//OBTENER USERDATA
export async function getUserData(token, email) {
	const res = await fetch("https://lost-pets-webapp-v1.onrender.com/me", {
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
