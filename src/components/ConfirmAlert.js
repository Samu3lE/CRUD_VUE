import Swal from "sweetalert2";

export default {
    async confirmAlert({ title, text, icon }) {
        const { isConfirmed } = await Swal.fire({
            title,
            text,
            icon,
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, estoy seguro!",
        });

        return isConfirmed;
    },

    async confirmSuccess(title, text, icon) {
        return Swal.fire(title, text, icon);
    },

    async confirmError(text) {
        return Swal.fire("Oops!", text, "error");
    },

    async showLoading() {
        return Swal.showLoading();
    },

    async loadMessage() {
        Swal.fire({
            title: "Espere por favor",
            allowOutsideClick: false,
        });
    },
};