import React from "react";
import css from "./index.css";

export function ReportInfoButton({ action }) {
	return (
		<button onClick={() => action()} className={css.root}>
			Reportar info!
		</button>
	);
}
