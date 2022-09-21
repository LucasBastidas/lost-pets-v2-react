import React, { useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import css from "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSetMapbox } from "hooks/mapbox";

const Map = ReactMapboxGl({
	accessToken:
		"pk.eyJ1IjoiemFwYWlhZGV2IiwiYSI6ImNreTF1cnZ5YTBlcWMyd3NjbGhxcnV6ZmkifQ.ZmsUrIAbUSkznfj8e97tmQ",
});

const boxStyles = {
	fontSize: 13,
};

type MapBoxSearchProps = {
	onChange?: (any) => any;
};

function MapboxSearch(props: MapBoxSearchProps) {
	const { onChange } = props;
	const [query, setQuery] = useState("");
	const setPetLocation = useSetMapbox();
	// lo seteo any porque la prop "center" de Map se queja

	const myLoc = JSON.parse(localStorage.getItem("myLoc"));

	var initialCoords: any;
	myLoc
		? (initialCoords = myLoc)
		: (initialCoords = [-0.481747846041145, 51.3233379650232]);
	const [coords, setCoords] = useState(initialCoords);

	async function search() {
		// esta API la saqué de por ahi
		const data = await fetch(
			`https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${query}&format=json`
		).then((r) => r.json());
		// console.log(data);
		const lat = parseFloat(data[0].lat);
		const lng = parseFloat(data[0].lon);
		const newCoords = [lng, lat];
		setPetLocation({ lat, lng, ubication: query });
		// console.log(newCoords);
		setCoords(newCoords);

		// lo "tiro" hacia arriba para que reciban las coordenadas desde "afuera"
		if (onChange) {
			onChange({
				query: query,
				coords: newCoords,
			});
		}
	}

	function inputChangeHandler(e) {
		setQuery(e.target.value);
		// console.log(e.target.value);
	}

	function keydownInputHandler(e) {
		// si no es con form, tengo que agregar esto
		if (e.key == "Enter") {
			// evito que se dispare el submit
			e.preventDefault();
			search();
		}
	}

	return (
		<div>
			<div className={css["input-button-cont"]}>
				<input
					className={css.input}
					type="text"
					onChange={inputChangeHandler}
					onKeyDown={keydownInputHandler}
					value={query}
					style={boxStyles}
				/>
				<button
					className={css.button}
					style={boxStyles}
					onClick={search}
					type="button"
				>
					Buscar
				</button>
			</div>
			<div className={css["map-cont"]}>
				<Map
					style="mapbox://styles/mapbox/streets-v9"
					containerStyle={{
						height: "250px",
						width: "333px",
					}}
					zoom={[15]}
					center={coords}
					movingMethod="easeTo"
				>
					<Layer
						type="symbol"
						id="marker"
						layout={{ "icon-image": "marker-15" }}
					>
						<Feature coordinates={coords} />
					</Layer>
				</Map>
			</div>
		</div>
	);
}

export { MapboxSearch };
