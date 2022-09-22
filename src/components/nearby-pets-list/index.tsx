import React, { useState, useEffect, Suspense } from "react";
import { getReportPetEmail, sendReportPetEmail } from "lib";
import { NearbyPetCard } from "components/nearby-pet-card";
import { useNearbyPets } from "hooks/nearbyPets";
import { ReportInfoForm } from "components/report-info-form";
import css from "./index.css";
import {
	useGetReportEmail,
	usePetEmail,
	useSendReport,
	useSetPetEmail,
} from "hooks/reportInfo";
import { useSwal } from "ui/alert";

export function NearbyPetsList() {
	const nearbyPets = useNearbyPets();
	const [load, setLoad] = useState(false);
	const [petId, setPetId] = useState(null);
	const [formStatus, setFormStatus] = useState(false);
	const [petReportName, setPetReportName] = useState({ name: "" });
	const setEmail = useSetPetEmail();
	const petEmail = usePetEmail();
	//ABRE EL FORM Y OBTIENE EL ID DE LA PET
	async function openForm(id, petName) {
		setPetId(id);
		setFormStatus(true);
		setPetReportName(petName);
	}

	//CIERRA EL FORM
	function closeForm() {
		setFormStatus(false);
	}

	//ENVIA EL EMAIL
	function handleForm(formData) {
		const tel = formData.tel;
		const message = formData.description;
		const name = formData.name;
		if (name != "" || tel != "" || message != "") {
			setLoad(true);
			useSendReport(name, tel, message, petReportName, petId).then(() => {
				console.log("ok");
				useSwal("Hecho", "El reporte se envío correctamente", "success").then(
					() => {
						closeForm();
					}
				);
			});
			// useGetReportEmail(petId).then((email) => {
			// 	// setEmail(email);
			// 	// console.log("soy email:", email);
			// 	useSendReport(name, tel, message, petReportName, email).then(() => {
			// 		setLoad(false);
			// 		useSwal("Hecho", "El reporte se envío correctamente", "success").then(
			// 			() => {
			// 				closeForm();
			// 			}
			// 		);
			// 	});
			// });
		} else {
			useSwal("Error", "No completaste todos los campos", "error");
		}
	}

	return (
		<div>
			{nearbyPets.length != 0 ? (
				<div className={css["pet-list"]}>
					<h1 className={css.title}>
						ESTAS MASCOTAS ESTAN CERCA DE TU UBICACIÓN
					</h1>
					{nearbyPets.map((pet) => (
						<NearbyPetCard
							onAction={openForm}
							lost={pet.lost}
							name={pet.name}
							description={pet.description}
							id={pet.objectID}
							key={pet.objectID}
							ubication={pet.ubication}
							picture={pet.imageUrl}
						></NearbyPetCard>
					))}
					<ReportInfoForm
						load={load}
						onForm={handleForm}
						onClose={closeForm}
						active={formStatus}
					/>
				</div>
			) : (
				<h1 className={css.title}>NO HAY MASCOTAS CERCA.</h1>
			)}
		</div>
	);
}
