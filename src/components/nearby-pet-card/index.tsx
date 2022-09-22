import React from "react";
import css from "./index.css";
import { ReportInfoButton } from "ui/buttons/report-info-button";
export function NearbyPetCard({
	name,
	description,
	id,
	userId,
	picture,
	ubication,
	lost,
	onAction,
}) {
	return (
		<div id={id} className={css.root}>
			<div className={lost == "false" ? css["no-hover"] : css.hover}>
				<ReportInfoButton
					action={() => onAction(userId, name)}
				></ReportInfoButton>
			</div>
			<div className={css["image-cont"]}>
				<img className={css.image} src={picture} alt="pet-picture" />
			</div>
			<div>
				<h2 className={css.name}>{name}</h2>
			</div>
			<div className={css["ubi-and-description-cont"]}>
				<div className={css["ubication-cont"]}>
					<h3 className="ubi">{ubication}</h3>
				</div>
				<div className={css["description-cont"]}>
					<p className={css.description}>{description}</p>
				</div>
			</div>
			<div className="button-cont">
				{lost == "false" ? (
					<div>Encontrado!😁</div>
				) : (
					<div className={css["button-cont"]}>
						<ReportInfoButton
							action={() => onAction(id, name)}
						></ReportInfoButton>
					</div>
				)}
			</div>
		</div>
	);
}
