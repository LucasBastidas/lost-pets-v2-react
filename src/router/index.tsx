import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LayoutComp } from "components/layout";
import { HomePage } from "pages/home/Home";
import { NearbyPetsPage } from "pages/nearby-pets-page";
import { LogInPage } from "pages/log-in-page";
import { SignUpPage } from "pages/sign-up-page";
import { loginState } from "hooks/login";
import { useRecoilState } from "recoil";
import { getUserData } from "lib/userData";
import { tokenState } from "hooks/myReportedPets";
import { userDataState } from "hooks/user-data";
import { MyDataPage } from "pages/my-data-page";
import { MyReportedPetsPage } from "pages/my-reported-pets-page";
import { ReportNewPetPage } from "pages/report-new-pet-page";
export function AppRouter() {
	const token = localStorage.getItem("token");
	const email = localStorage.getItem("email");
	const [loggedState, setLoggedState] = useRecoilState(loginState);
	const [userData, setData] = useRecoilState(userDataState);
	const [newToken, setNewToken] = useRecoilState(tokenState);
	useEffect(() => {
		// console.log(token);
		if (token) {
			// console.log("estoy logeado, soy router");
			setLoggedState({ logged: true });
			getUserData(token, email).then((userData) => {
				setData({ name: userData.fullName, id: userData.id });
				setNewToken(token);
			});
		}
	}, [token]);
	return (
		<Routes>
			<Route path="/" element={<LayoutComp />}>
				<Route index element={<HomePage />}></Route>
				<Route path="/nearby-pets" element={<NearbyPetsPage />}></Route>
				<Route path="/sign-up" element={<SignUpPage />}></Route>
				<Route path="/log-in" element={<LogInPage />}></Route>
				<Route path="/my-data" element={<MyDataPage />}></Route>
				<Route
					path="/my-reported-pets"
					element={<MyReportedPetsPage />}
				></Route>
				<Route path="/report-new-pet" element={<ReportNewPetPage />}></Route>
			</Route>
		</Routes>
	);
}
