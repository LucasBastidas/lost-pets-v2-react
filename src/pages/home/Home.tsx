import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HomeButton } from "ui/buttons/home-button";
import css from "./index.css";
import { NearbyPetsList } from "components/nearby-pets-list";

export function HomePage() {
	return (
		<div className={css.root}>
			<h1 style={{ padding: "20px" }}>
				Para ver las mascotas cercanas, necesitamos tu ubicación
			</h1>
			<Link to={"./nearby-pets"}>
				<HomeButton onAction={() => {}}>Dar mi ubicación</HomeButton>
			</Link>
		</div>
	);
}
