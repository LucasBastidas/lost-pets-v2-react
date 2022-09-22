import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import menu from "../../assets/menu.png";
import css from "./index.css";
import { BurgerMenuComp } from "components/burguer-menu";
import { useLoginValue, useSetLoginState } from "hooks/login";
import { useSetPathState } from "hooks/path";

export function HeaderComp(props) {
	const [activeMenu, setActiveMenu] = useState(false);

	//AVISA SI ESTOY LOGEADO O NO
	const loginState = useLoginValue();
	//SETEA QUE ESTOY LOGEADO O NO
	const setLoginState = useSetLoginState();
	//SETEA EL PATH
	const setPathState = useSetPathState();

	const navigate = useNavigate();

	function handleLogoClick() {
		navigate("/");
	}

	function openMenu() {
		// console.log("abro menu");
		setActiveMenu(true);
	}

	function closeMenu() {
		// console.log("cierro menu");
		setActiveMenu(false);
	}

	function goToLogIn() {
		setPathState("/");
		navigate("/log-in");
		closeMenu();
	}

	function goToMyData() {
		if (loginState.logged) {
			navigate("/my-data");
			closeMenu();
		} else {
			setPathState("/my-data");
			navigate("/log-in");
			closeMenu();
		}
	}

	function goToMyReportedPets() {
		if (loginState.logged) {
			navigate("/my-reported-pets");
			closeMenu();
		} else {
			setPathState("/my-reported-pets");
			navigate("/log-in");
			closeMenu();
		}
	}

	function goToReportNewPet() {
		if (loginState.logged) {
			navigate("/report-new-pet");
			closeMenu();
		} else {
			setPathState("/report-new-pet");
			navigate("/log-in");
			closeMenu();
		}
	}

	function logOut() {
		localStorage.clear();
		navigate("/");
		setLoginState({ logged: false });
		closeMenu();
	}

	return (
		<div>
			<header className={css.root}>
				<img onClick={handleLogoClick} src={logo} alt="" className={css.logo} />
				<div className={css["menu-cont"]}>
					<img src={menu} alt="" className={css.menu} onClick={openMenu} />
				</div>
			</header>
			<BurgerMenuComp
				onLogout={logOut}
				onLogIn={goToLogIn}
				display={activeMenu ? "flex" : "none"}
				onClose={closeMenu}
				onMyData={goToMyData}
				onMyReportedPets={goToMyReportedPets}
				onReportNewPet={goToReportNewPet}
			/>
		</div>
	);
}
