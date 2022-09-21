import Swal from "sweetalert2";

export function useSwal(title, text, icon) {
	return Swal.fire({
		color: "#25316D",
		background: "rgb(179 216 233)",
		title: title,
		text: text,
		icon: icon,
		confirmButtonText: "Ok",
		confirmButtonColor: "#25316D",
	});
}
