import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	atom,
	selector,
	useRecoilValue,
	useRecoilState,
	useSetRecoilState,
} from "recoil";

export const dropZoneState = atom({
	key: "dropzoneState",
	default: {
		dropImage: null,
	},
});

export const useDropzoneState = () => useRecoilState(dropZoneState);
export const useDropzoneValue = () => useRecoilValue(dropZoneState);
export const useSetDropzone = () => useSetRecoilState(dropZoneState);
