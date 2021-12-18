<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Agregar Nuevo Empleado</div>
      <div class="card-body">
        <form v-on:submit.prevent="CreateEmployee">
          <div class="form-group">
            <label for="name">Nombre y Apellido:</label>
            <input
              type="text"
              class="form-control"
              name="name"
              id="name"
              v-model="employee.name"
              aria-describedby="helpId"
              placeholder="Nombre y Apellido"
              required
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
              v-model="employee.email"
              aria-describedby="emailHelpId"
              placeholder="Correoelectronico@mail.co"
              required
            />
            <small id="emailHelpId" class="form-text text-muted"
              >Ingrese el correo electronico del empleado</small
            >
          </div>

          <div class="btn-group" role="group" aria-label="">
            <button type="submit" class="btn btn-outline-success">
              Agregar
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    let employee = {};

    const CreateEmployee = async () => {
      const sendData = {
        name: employee.name,
        email: employee.email,
      };
      try {
        const Created = await store.dispatch(
          "crudStore/CreateEmployee",
          sendData
        );

        if (Created) {
          await Swal.fire(
            "Registrado!",
            "El empleado ha sido registrado exitosamente",
            "success"
          );
          router.push({ name: "List" });
        } else {
          Swal.fire("Oops!", "El empleado no ha sido registrado", "error");
        }
      } catch (error) {
        Swal.fire(
          "Oops!",
          "El empleado no ha sido registrado: " + error,
          "error"
        );
      }
    };
    return {
      CreateEmployee,
      employee,
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
