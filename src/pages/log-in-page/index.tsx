import React, { useEffect } from "react";

import { LogInForm } from "components/log-in-form";
import css from "./index.css";

export function LogInPage() {
	return (
		<div className={css.root}>
			<LogInForm></LogInForm>
		</div>
	);
}
