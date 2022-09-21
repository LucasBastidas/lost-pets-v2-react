import React, { useEffect, useState, Suspense } from "react";
import { myPetsState, useUpdateMyReportedPet } from "hooks/myReportedPets";
import { useRecoilState } from "recoil";
import { useMyReportedPets } from "hooks/myReportedPets";
import { useNavigate } from "react-router-dom";
import { useSetPathState } from "hooks/path";
import { MyReportedPetCard } from "components/my-reported-pet-card";
import { EditPetForm } from "components/edit-pet-form";
import { useSwal } from "ui/alert";
import { useSetDropzone } from "hooks/dropzone";
import { useSetMapbox } from "hooks/mapbox";
import Swal from "sweetalert2";
import css from "./index.css";
import {
	changeStateOfReportToFounded,
	petPublicationDelete,
} from "lib/postAndUpdatePets";

export function MyReportedPetsList() {
	const [load, setLoad] = useState(false);
	const [formStatus, setFormStatus] = useState(false);
	const [petId, setPetId] = useState(null);
	const setDropzone = useSetDropzone();
	const setMapbox = useSetMapbox();
	const setPath = useSetPathState();

	const [pets, setPets] = useState([]); // GUARDO LAS PETS DEL RECOIL EN UN STATE DE REACT

	const [myPets, setMyPets] = useRecoilState(myPetsState); //LAS PETS QUE VIENEN DEL RECOIL STATE

	useMyReportedPets(); //TRAE LAS PETS

	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	function openForm(id) {
		setPetId(id);
		setFormStatus(true);
	}

	function closeMenu() {
		setFormStatus(false);
	}

	useEffect(() => {
		if (!token) {
			navigate("/log-in");
			setPath("/my-reported-pets");
		}
		setPets(myPets); //CADA VEZ QUE CAMBIA EN RECOIL SE ACTUALIZA EN EL STATE
	}, [myPets]);

	//EDITA LA MASCOTA
	function editSubmit(name, description, url, ubicationData) {
		console.log(ubicationData);
		console.log(petId);
		var lat;
		var lng;
		var ubication;
		setLoad(true);
		if (name == "") {
			name = undefined;
		}
		if (description == "") {
			description = undefined;
		}
		if (url == null) {
			url = undefined;
		}
		if (ubicationData == null) {
			lat = undefined;
			lng = undefined;
			ubication = undefined;
		}
		if (ubicationData != null) {
			lat = ubicationData.lat;
			lng = ubicationData.lng;
			ubication = ubicationData.ubication;
		}
		console.log({ name, description, url, lat, lng, ubication });
		useUpdateMyReportedPet(
			token,
			petId,
			name,
			description,
			url,
			lat,
			lng,
			ubication
		).then(() => {
			setLoad(false);
			setDropzone(null);
			setMapbox(null);
			useSwal(
				"Hecho",
				"Se actualizó la información de la mascota",
				"success"
			).then(() => {
				window.location.reload();
			});
		});
	}

	//CAMBIA LA MASCOTA A ENCONTRADA
	function changeToFounded(id) {
		changeStateOfReportToFounded(token, id).then(() => {
			useSwal(
				"Hecho",
				"Se actualizó la información de la mascota",
				"success"
			).then(() => {
				window.location.reload();
			});
		});
	}

	//ELIMINA LA PUBLICACIÓN
	function deletePublication(id) {
		Swal.fire({
			title: "Estas segurx?",
			text: "Se borrará para siempre!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
		}).then((result) => {
			if (result.isConfirmed) {
				petPublicationDelete(token, id).then(() => {
					Swal.fire("Eliminado!", "Se eliminó la publicación.", "success").then(
						() => {
							window.location.reload();
						}
					);
				});
			} else {
				navigate("/my-reported-pets");
			}
		});
	}

	return (
		<div>
			{pets.length != 0 ? (
				<div className={css["pet-list"]}>
					{pets.length == 1 ? (
						<div className={css["pet-list"]}>
							<h1 className={css.title}>ESTA ES TU MASCOTA REPORTADA</h1>
							{pets.map((pet) => (
								<MyReportedPetCard
									name={pet.name}
									description={pet.description}
									key={pet.id}
									id={pet.id}
									picture={pet.imageUrl}
									ubication={pet.ubication}
									lost={pet.lost}
									onDelete={() => {
										deletePublication(pet.id);
									}}
									onEdit={() => {
										openForm(pet.id);
									}}
									onFound={() => {
										changeToFounded(pet.id);
									}}
								/>
							))}
						</div>
					) : (
						<div>
							<h1 className={css.title}>ESTAS SON TUS MASCOTAS REPORTADAS</h1>
							<div className={css["pet-list"]}>
								{pets.map((pet) => (
									<MyReportedPetCard
										name={pet.name}
										description={pet.description}
										key={pet.id}
										id={pet.id}
										picture={pet.imageUrl}
										ubication={pet.ubication}
										lost={pet.lost}
										onDelete={() => {
											deletePublication(pet.id);
										}}
										onEdit={() => {
											openForm(pet.id);
										}}
										onFound={() => {
											changeToFounded(pet.id);
										}}
									/>
								))}
							</div>
						</div>
					)}
					<EditPetForm
						onEditSubmit={editSubmit}
						onClose={closeMenu}
						active={formStatus}
						onLoad={load}
					/>
				</div>
			) : (
				<div style={{ textAlign: "center", color: "#25316D" }}>
					<h1 className={css.title}>NO TIENES MASCOTAS REPORTADAS</h1>
				</div>
			)}
		</div>
	);
}
