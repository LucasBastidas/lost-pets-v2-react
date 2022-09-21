import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSetDropzone, useDropzoneValue } from "hooks/dropzone";
import css from "./index.css";
import { DropzoneButton } from "ui/buttons/dropzone-button";
import uploadImage from "../../assets/image-upload.png";

const styleBox: any = {
	width: "333px",
	// background: "red",
	height: "250px",
	padding: "5px",
	border: "2px dashed #ccc",
	display: "flex",
	flexDirection: "column",
	margin: "0 auto",
	borderRadius: "25px",
	cursor: "pointer",
};

type dropProps = {
	initPreview?: string;
};

export function Dropzone(props: dropProps) {
	const { initPreview } = props;
	const setDropzoneImage = useSetDropzone();
	const [preview, setPreview] = useState(
		initPreview ? initPreview : uploadImage
	);

	const dropImage = useDropzoneValue();

	useEffect(() => {
		// actualiza el preview de la imagen
		if (dropImage.dropImage) setPreview(dropImage.dropImage);
	}, [dropImage.dropImage]);

	const { getRootProps } = useDropzone({
		// accept: "image/*",
		onDrop: (acceptedFiles) => {
			const reader: FileReader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				// se obtiene la url de la imagen
				setDropzoneImage({ dropImage: e.target.result });
			};
			reader.readAsDataURL(acceptedFiles[0]);
		},
	});

	return (
		<div className={css.root} {...getRootProps()}>
			<img src={preview} style={styleBox} />
			<DropzoneButton onClick={() => {}} />
		</div>
	);
}
