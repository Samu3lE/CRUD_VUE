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
};