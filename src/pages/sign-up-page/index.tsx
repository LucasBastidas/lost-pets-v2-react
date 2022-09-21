import React from "react";
import { SignUpForm } from "components/sign-up-form";
import css from "./index.css";

export function SignUpPage() {
	return (
		<div className={css.root}>
			<SignUpForm></SignUpForm>
		</div>
	);
}
