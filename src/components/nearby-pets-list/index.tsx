import React, { useState, useEffect, Suspense } from "react";
import { NearbyPetCard } from "components/nearby-pet-card";
import { useNearbyPets } from "hooks/nearbyPets";
import { ReportInfoForm } from "components/report-info-form";
import css from "./index.css";
import { useSendReport } from "hooks/reportInfo";
import { useSwal } from "ui/alert";
import { useNavigate } from "react-router-dom";

export function NearbyPetsList() {
	const nearbyPets = useNearbyPets();
	const [load, setLoad] = useState(false);
	const [userId, setUserId] = useState(null);
	const [formStatus, setFormStatus] = useState(false);
	const [petReportName, setPetReportName] = useState("");
	const navigate = useNavigate();
	//ABRE EL FORM Y OBTIENE EL ID DEL USUARIO
	async function openForm(userId, petName) {
		setUserId(userId);
		setFormStatus(true);
		setPetReportName(petName);
	}

	//CIERRA EL FORM
	function closeForm() {
		setFormStatus(false);
	}

	//ENVIA EL EMAIL
	async function handleForm(formData) {
		const tel = formData.tel;
		const message = formData.description;
		const name = formData.name;
		if (name != "" || tel != "" || message != "") {
			setLoad(true);
			useSendReport(name, tel, message, petReportName, userId).then(() => {
				useSwal("Hecho", "El reporte se envío correctamente", "success").then(
					() => {
						closeForm();
						setLoad(false);
					}
				);
			});
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
							userId={pet["user_id"]}
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
