import React from "react";
import { MyDataForm } from "components/my-data-form";
import css from "./index.css";
export function MyDataPage() {
	return (
		<div className={css.root}>
			<MyDataForm />
		</div>
	);
}
