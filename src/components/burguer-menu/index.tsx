import React, { useState } from "react";
import css from "./index.css";
import { useLoginValue } from "hooks/login";

export function BurgerMenuComp({
	display,
	onClose,
	onLogIn,
	onMyData,
	onLogout,
	onReportNewPet,
	onMyReportedPets,
}) {
	// const [activeMenu, setActiveMenu] = useState(true);

	const logged = useLoginValue();

	const email = localStorage.getItem("email");

	return logged.logged ? (
		<div>
			<div className={css.root} style={{ display: display }}>
				<div
					onClick={() => onClose()}
					onAuxClick={() => {}}
					className={css["close-button"]}
				>
					X
				</div>
				<div>
					<p onClick={() => onMyData()}>Mis Datos</p>
					<p onClick={() => onMyReportedPets()}>Mis mascotas reportadas</p>
					<p
						onClick={() => onReportNewPet()}
						className="reportar-pet button-menu"
					>
						Reportar Mascota
					</p>
				</div>
				<div className="sesion-buttons-cont">
					<p className="log-in-button button-menu">{email}</p>
					<p onClick={() => onLogout()} className="log-out-button button-menu">
						Cerrar sesión
					</p>
				</div>
			</div>
		</div>
	) : (
		<div>
			<div className={css.root} style={{ display: display }}>
				<div
					onClick={() => onClose()}
					onAuxClick={() => {}}
					className={css["close-button"]}
				>
					X
				</div>
				<div>
					<p onClick={() => onMyData()}>Mis Datos</p>
					<p onClick={() => onMyReportedPets()}>Mis mascotas reportadas</p>
					<p
						onClick={() => onReportNewPet()}
						className="reportar-pet button-menu"
					>
						Reportar Mascota
					</p>
				</div>
				<div className="sesion-buttons-cont">
					<p className="my-email button-menu">No estas logeadx</p>

					<p onClick={() => onLogIn()} className="log-in-button button-menu">
						Iniciar sesión
					</p>
				</div>
			</div>
		</div>
	);
}
