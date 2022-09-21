const API_SERVER = "https://lost-pets-app-v1.herokuapp.com";

//POSTEA UN NUEVO REPORTE

export async function postNewReport(
	token: string,
	name: string,
	description: string,
	imageUrl: string,
	lat,
	lng,
	ubication: string
) {
	const postNewPet = await fetch(API_SERVER + "/pets", {
		method: "post",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},
		body: JSON.stringify({
			name: name,
			lost: true,
			description: description,
			imageUrl: imageUrl,
			lat: lat,
			lng: lng,
			ubication: ubication,
		}),
	});
	const res = await postNewPet.json();

	return res;
}

//MODIFICAR PET EN LA DB

export async function updateMyReportedPet(
	token,
	id,
	name?,
	description?,
	imageUrl?,
	lat?,
	lng?,
	ubication?
) {
	const newReportPet = await fetch(API_SERVER + "/me/pets?id=" + id, {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},

		body: JSON.stringify({
			name: name,
			description: description,
			imageUrl: imageUrl,
			lat: lat,
			lng: lng,
			ubication: ubication,
		}),
	});
	return newReportPet;
}

//CAMBIAR A: "ENCONTRADA"

export async function changeStateOfReportToFounded(token, petId) {
	const updatedPet = await fetch(API_SERVER + "/me/pets?id=" + petId, {
		method: "PATCH",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},

		body: JSON.stringify({
			lost: "false",
		}),
	});
	return updatedPet;
}

//ELIMINA LA PUBLICACIÓN

export async function petPublicationDelete(token, petId) {
	const deletedPet = await fetch(API_SERVER + "/me/pets?id=" + petId, {
		method: "DELETE",
		headers: {
			"content-type": "application/json",
			authorization: "bearer " + token,
		},
	});
	return deletedPet;
}
