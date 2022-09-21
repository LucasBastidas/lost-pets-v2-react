import React from "react";
import css from "./index.css";

export function HomeButton({ children, onAction }) {
	return (
		<button onClick={() => onAction()} className={css["home-button"]}>
			{children}
		</button>
	);
}
