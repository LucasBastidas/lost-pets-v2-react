import React from "react";
import css from "./index.css";

export function DropzoneButton({ onClick }) {
	return (
		<div className={css["button-cont"]}>
			<button onClick={() => onClick()} className={css.button}>
				Agregar/cambiar imagen
			</button>
		</div>
	);
}
