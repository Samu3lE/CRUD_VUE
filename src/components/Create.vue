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

export default {
  setup() {
    const store = useStore();

    let employee = {};

    const CreateEmployee = () => {
      const sendData = {
        name: employee.name,
        email: employee.email,
      };
      // console.log("sendData", sendData);
      let InsertData = store.dispatch("crudStore/CreateEmployee", sendData);
      // console.log("InsertaData", InsertData);
      InsertData
        ? (window.location.href = "/")
        : console.error("Error al insertar");
    };

    return {
      CreateEmployee,
      employee,
    };
  },
};
</script>

<style scoped></style>
