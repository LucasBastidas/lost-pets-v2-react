const API_SERVER = "https://lost-pets-app-v1.herokuapp.com";
//CAMBIA EL NOMBRE EN LA DB
export async function updateName(newName: string, token: string) {
	const nameChange = await fetch(API_SERVER + "/me/update", {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},
		body: JSON.stringify({
			fullName: newName,
		}),
	});
	const data = await nameChange.json();
	return data;
}

//CAMBIAR PASSWORD
export async function updatePassword(newPassword: string, token) {
	const passwordChanged = await fetch(API_SERVER + "/auth/change-password", {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},
		body: JSON.stringify({
			password: newPassword,
		}),
	});
	const data = await passwordChanged.json();
	return data;
}
