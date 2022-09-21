import { ReportNewPetForm } from "components/report-new-pet-form";
import React from "react";
import css from "./index.css";

export function ReportNewPetPage() {
	return (
		<div className={css.root}>
			<ReportNewPetForm />
		</div>
	);
}
