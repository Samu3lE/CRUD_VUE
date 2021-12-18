<script>
export default {
  setup() {
    const { isConfirmed } = await Swal.fire({
      title: "¿Está seguro?",
      text: "Una vez borrado, no se puede recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro!",
    });

    if (isConfirmed) {
      Swal.fire({
        title: "Espere por favor",
        allowOutsideClick: false,
      });
      Swal.showLoading();
      const deleted = await deleteEmployee(idEmployee);
      console.log("Se eliminó", deleted);
      if (deleted) {
        router.replace({ name: "List" });
        Swal.fire("Eliminado!", "La entrada ha sido eliminada", "success");
      } else {
        Swal.fire("Oops!", "La entrada no ha sido eliminada", "error");
      }
    }
  },
};
</script>

<style></style>
