import React from "react";
import css from "./index.css";

export function ReportInfoForm({ active, onClose, onForm, load }) {
	function handleForm(e) {
		e.preventDefault();
		const target = e.target;
		const name = target.name.value;
		const tel = target.tel.value;
		const description = target.description.value;
		onForm({ name, tel, description });
	}
	return (
		<div
			className={active ? css["form-cont-active"] : css["form-cont-inactive"]}
		>
			<div
				onClick={() => {
					onClose();
				}}
				className={css["close-button"]}
			>
				X
			</div>
			<form className={css.form} onSubmit={handleForm}>
				<label>
					<h3>Nombre</h3>
					<input className={css.input} type="text" name="name" />
				</label>
				<label>
					<h3>Tu numero</h3>
					<input className={css.input} type="tel" name="tel" />
				</label>
				<label>
					<h3>Descripción de donde lo viste</h3>
					<textarea
						className={css["text-area"]}
						name="description"
						id=""
						cols={30}
						rows={10}
					></textarea>
				</label>
				<div className={css["button-cont"]}>
					{load ? (
						<div>
							<h3>Enviando..</h3>
						</div>
					) : (
						<div>
							<button className={css.button}>enviar</button>
						</div>
					)}
				</div>
			</form>
		</div>
	);
}
