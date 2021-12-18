<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Modificar Datos Empleado</div>
      <div class="card-body">
        <form v-on:submit.prevent="UpdateEmployee">
          <div class="form-group">
            <label for="name">Nombre y Apellido:</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              aria-describedby="helpId"
              placeholder="Nombre y Apellido"
              required
              v-model="employee.name"
            />
            <small id="helpId" class="form-text text-muted"
              >Escribe nombre y apellido del empleado</small
            >
          </div>
          <div class="form-group">
            <label for="email">Correo:</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="email"
              aria-describedby="emailHelpId"
              placeholder="Correoelectronico@mail.co"
              required
              v-model="employee.email"
            />
            <small id="emailHelpId" class="form-text text-muted"
              >Ingrese el correo electronico del empleado</small
            >
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button type="submit" class="btn btn-outline-success">
              Modificar
            </button>
            <router-link :to="{ name: 'List' }" class="btn btn-outline-danger"
              >Cancelar</router-link
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

import Swal from "sweetalert2";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const { id } = route.query;
    let sendData = {};

    onMounted(async () => {
      await store.dispatch("crudStore/SearchEmployeesByID", id);
    });

    let employee = computed(() => store.state.crudStore.entries);

    const UpdateEmployee = async () => {
      sendData = {
        id,
        name: employee.value.name,
        email: employee.value.email,
      };
      console.log("sendData", sendData);
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro?",
        text: "Los datos del empleado serán actualizados!",
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

        try {
          const updated = await store.dispatch(
            "crudStore/UpdateEmployee",
            sendData
          );

          if (updated) {
            await Swal.fire(
              "Actualizado!",
              "La entrada ha sido actualizada",
              "success"
            );
            router.push({ name: "List" });
          } else {
            Swal.fire(
              "Oops!",
              "Los datos no fueron actualizados: " + updated,
              "error"
            );
          }
        } catch (error) {
          Swal.fire(
            "Oops!",
            "Los datos no fueron actualizados: " + error,
            "error"
          );
        }
      }
    };

    return {
      employee,
      UpdateEmployee,
    };
  },
};
</script>

<style scoped>
.btn-group {
  margin-top: 2rem;
  display: block;
  text-align: center;
}
</style>
