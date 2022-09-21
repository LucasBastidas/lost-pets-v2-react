import {
	atom,
	useRecoilState,
	useRecoilValue,
	useSetRecoilState,
} from "recoil";

export const pathState = atom({
	key: "pathState",
	default: "",
});

export const usePathState = () => useRecoilValue(pathState);
export const useSetPathState = () => useSetRecoilState(pathState);
