//LLAMADAS A LA API
const API_SERVER = "https://lost-pets-webapp-v1.onrender.com";

//BUSCAR MASCOTAS PERDIDAS CERCANAS
export async function getNearbyPets(myLoc) {
	// console.log(myLoc);
	var results = [];
	const search = await fetch(
		API_SERVER + "/pets-close-to?lat=" + myLoc.lat + "&lng=" + myLoc.lng
	);
	const data = await search.json();

	return data;
}

//OBTENER EMAIL DE LA MASCOTA
export async function getReportPetEmail(id) {
	const user = await fetch(API_SERVER + "/users", {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"content-type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({
			id: id,
		}),
	});
	const userData = await user.json();
	return userData.email;
}

//ENVIAR EMAIL DE REPORTE
export async function sendReportPetEmail(
	name: string,
	tel,
	message: string,
	petReported: string,
	petEmail: string
) {
	const emailReport = await fetch(API_SERVER + "/send-email", {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"content-type": "application/json",
		},
		method: "post",
		body: JSON.stringify({
			name: name,
			tel: tel,
			message: message,
			petName: petReported,
			email: petEmail,
		}),
	});
	const emailReportData = await emailReport.json();
	return emailReportData;
}
