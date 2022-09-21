import React, { useEffect, useState } from "react";
import { InputComp } from "ui/input";
import { Dropzone } from "lib/drop-zone";
import css from "./index.css";
import { useDropzoneValue, useSetDropzone } from "hooks/dropzone";
import { MapboxSearch } from "components/mapbox-form";
import { useMapboxValue, useSetMapbox } from "hooks/mapbox";
import { useNavigate } from "react-router-dom";
import { usePostNewReport } from "hooks/reportNewPet";
import { useSwal } from "ui/alert";

export function ReportNewPetForm() {
	const [load, setLoad] = useState(false);
	const [petName, setPetName] = useState("");
	const [petDescription, setPetDescription] = useState("");
	const [petUbication, setPetUbication] = useState("");
	const urlImage = useDropzoneValue();
	const petLocation = useMapboxValue();
	const setMapbox = useSetMapbox();
	const setDropzone = useSetDropzone();
	const navigate = useNavigate();
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token) {
			console.log("me quedo");
		} else {
			navigate("/");
		}
	}, [token]);

	function handleSubmit() {
		if (
			urlImage.dropImage &&
			petName != "" &&
			petDescription != "" &&
			petLocation
		) {
			const lat = petLocation.lat;
			const lng = petLocation.lng;
			const ubication = petLocation.ubication;
			const url = urlImage.dropImage;
			setLoad(true);
			usePostNewReport(
				token,
				petName,
				petDescription,
				url,
				lat,
				lng,
				ubication
			).then((res) => {
				if (res.ok) {
					useSwal("Hecho!", "El reporte se publicó correctamente", "success");
					setLoad(false);
					setDropzone({ dropImage: null });
					setMapbox(null);
					navigate("/my-reported-pets");
				} else {
					useSwal("Oops!", "Al parecer hubo un error", "error");
				}
			});
		} else {
			useSwal("Error", "No completaste todos los campos", "error");
		}
	}

	function handleCancel() {
		setPetName("");
		setPetDescription("");
		setPetUbication("");
		navigate("/");
	}

	function handleName(e) {
		const petName = e.target.value;
		setPetName(petName);
	}

	function handleDescription(e) {
		const petDescription = e.target.value;
		setPetDescription(petDescription);
	}

	function handleUbication(e) {
		const petUbication = e.target.value;
		setPetUbication(petUbication);
	}

	return (
		<div className={css.root}>
			<div>
				<h2>Nombre</h2>
				<InputComp
					onChange={handleName}
					placeholder={"Nombre"}
					type="name"
					name="name"
				/>
				<h2>Imagen</h2>
				<Dropzone></Dropzone>
				<h2>Descripción</h2>
				<textarea
					onChange={handleDescription}
					className={css["text-area"]}
					name=""
					id=""
				></textarea>
				<h2>Ubicación (punto de referencia)</h2>
				<MapboxSearch></MapboxSearch>
				{load ? (
					<div className={css["spinner-cont"]}>
						<div className={css["lds-spinner"]}>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				) : (
					<div>
						<button onClick={handleSubmit} className={css["submit-button"]}>
							Publicar
						</button>
					</div>
				)}

				<div>
					<h4 onClick={handleCancel} className={css["cancel-button"]}>
						Cancelar
					</h4>
				</div>
			</div>
		</div>
	);
}
