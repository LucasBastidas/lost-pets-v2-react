import React, { useState, useEffect } from "react";
import {
	atom,
	selector,
	useRecoilValue,
	useRecoilState,
	useSetRecoilState,
} from "recoil";

const mapboxState = atom({
	key: "mapboxState",
	default: null,
});

export const useMapboxState = () => useRecoilState(mapboxState);
export const useMapboxValue = () => useRecoilValue(mapboxState);
export const useSetMapbox = () => useSetRecoilState(mapboxState);
