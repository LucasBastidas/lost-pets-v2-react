import React from "react";

export function LoginFormButton({ children, onForm }) {
	return (
		<div>
			<button
				onClick={() => {
					onForm();
				}}
			>
				{children}
			</button>
		</div>
	);
}
