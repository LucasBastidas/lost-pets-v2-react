import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderComp } from "components/header";

export function LayoutComp() {
	return (
		<div>
			<div>
				<HeaderComp></HeaderComp>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
