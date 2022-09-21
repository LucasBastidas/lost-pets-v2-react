import React from "react";
import css from "./index.css";
export function MyReportedPetCard({
	name,
	description,
	id,
	picture,
	ubication,
	lost,
	onEdit,
	onDelete,
	onFound,
}) {
	return (
		<div>
			{lost ? (
				<div id={id} className={css.root}>
					<div className={css.hovers}>
						<div className={css["buttons-cont"]}>
							<button className={css["button"]} onClick={() => onEdit()}>
								Editar
							</button>
							<button className={css["button"]} onClick={() => onFound()}>
								Se encontró
							</button>
						</div>
						<div className={css["delete-cont"]}>
							<button
								className={css["delete-button"]}
								onClick={() => onDelete()}
							>
								Eliminar
							</button>
						</div>
					</div>
					<div className={css["image-cont"]}>
						<img className={css.image} src={picture} alt="pet-picture" />
					</div>
					<div>
						<h2 className={css.name}>{name}</h2>
					</div>
					<div className={css["ubi-and-description-cont"]}>
						<div className={css["ubication-cont"]}>
							<h3 className={css.ubi}>{ubication}</h3>
						</div>
						<div className={css["description-cont"]}>
							<p className={css.description}>{description}</p>
						</div>
					</div>
					<div className={css["buttons-cont"]}>
						<button className={css["button"]} onClick={() => onEdit()}>
							Editar
						</button>
						<button className={css["button"]} onClick={() => onFound()}>
							Se encontró
						</button>
					</div>
					<div className={css["delete-cont"]}>
						<button className={css["delete-button"]} onClick={() => onDelete()}>
							Eliminar
						</button>
					</div>
				</div>
			) : (
				<div>
					<div id={id} className={css.root}>
						<div className={css.hovers}>
							<div className={css["delete-cont"]}>
								<button
									className={css["delete-button"]}
									onClick={() => onDelete()}
								>
									Eliminar
								</button>
							</div>
						</div>
						<div className={css["image-cont"]}>
							<img className={css.image} src={picture} alt="pet-picture" />
						</div>
						<div>
							<h2 className={css.name}>{name}</h2>
						</div>
						<div className={css["ubi-and-description-cont"]}>
							<div className={css["ubication-cont"]}>
								<h3 className={css.ubi}>{ubication}</h3>
							</div>
							<div className={css["description-cont"]}>
								<p className={css.description}>{description}</p>
							</div>
						</div>
						<h3>Encontrado!</h3>
						<div className={css["delete-cont"]}>
							<button
								className={css["delete-button"]}
								onClick={() => onDelete()}
							>
								Eliminar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
