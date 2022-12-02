const API_SERVER = "https://lost-pets-webapp-v1.onrender.com";

//SETEA LAS MASCOTAS REPORTADAS DEL USUARIO
export async function getMyReportPets(token) {
	const myPets = await fetch(API_SERVER + "/me/pets", {
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},
	});
	const data = await myPets.json();

	return data;
}
