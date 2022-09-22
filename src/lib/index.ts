//LLAMADAS A LA API
const API_SERVER = "https://lost-pets-app-v1.herokuapp.com";

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
			Accept: "application/json, text/plain, */*",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
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
			Accept: "application/json, text/plain, */*",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "*",
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
	console.log(emailReportData);
}
