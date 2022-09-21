import React from "react";
import css from "./index.css";
type inputProps = {
	name: string;
	type: string;
	placeholder?: string;
	onChange?: (e: any) => void;
};
export function InputComp(props: inputProps) {
	return (
		<input
			className={css.input}
			name={props.name}
			type={props.type}
			placeholder={props.placeholder}
			onChange={props.onChange}
		/>
	);
}
