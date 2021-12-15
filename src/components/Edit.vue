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
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch("crudStore/SearchEmployeesByID", route.params.id);
    });
    let employee = computed(() => store.state.crudStore.entries);

    const UpdateEmployee = () => {
      let sendData = {
        id: route.params.id,
        name: employee.value.name,
        email: employee.value.email,
      };

      let UpdateData = store.dispatch("crudStore/UpdateEmployee", sendData);

      UpdateData
        ? (window.location.href = "/")
        : console.error("Error al Actualizar");
    };

    return {
      employee,
      UpdateEmployee,
    };
  },
};
</script>

<style scoped></style>
