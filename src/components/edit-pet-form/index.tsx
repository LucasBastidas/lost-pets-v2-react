import React, { useState } from "react";
import { Dropzone } from "lib/drop-zone";
import { MapboxSearch } from "components/mapbox-form";
import css from "./index.css";
import { InputComp } from "ui/input";
import { useDropzoneValue } from "hooks/dropzone";
import { useMapboxValue } from "hooks/mapbox";

export function EditPetForm({ active, onClose, onEditSubmit, onLoad }) {
	const [petName, setPetName] = useState("");
	const [petDescription, setPetDescription] = useState("");
	const urlImage = useDropzoneValue().dropImage;
	const mapboxValue = useMapboxValue();
	function handleName(e) {
		const petName = e.target.value;
		setPetName(petName);
	}
	function handleDescription(e) {
		const petDescription = e.target.value;
		setPetDescription(petDescription);
	}
	function handleSubmit() {
		onEditSubmit(petName, petDescription, urlImage, mapboxValue);
	}
	function handleCancel() {
		setPetName("");
		setPetDescription("");
		onClose();
	}

	return (
		<div className={active ? css["active-form"] : css["inactive-form"]}>
			<div>
				<div
					onClick={() => {
						onClose();
					}}
					className={css["close-button"]}
				>
					X
				</div>
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
				{onLoad ? (
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
