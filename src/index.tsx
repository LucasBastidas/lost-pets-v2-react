import React, { Suspense } from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "router";
import { RecoilRoot } from "recoil";

const root = document.getElementById("root");

function App() {
	return (
		<Suspense
			fallback={
				<div className="spinner-cont">
					<div className="spinner"></div>
				</div>
			}
		>
			<RecoilRoot>
				<BrowserRouter>
					<AppRouter />
				</BrowserRouter>
			</RecoilRoot>
		</Suspense>
	);
}
ReactDom.render(<App />, root);
