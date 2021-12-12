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
export default {
  data() {
    return {
      employee: {},
    };
  },
  created: function () {
    this.SearchEmployeesByID();
  },
  methods: {
    SearchEmployeesByID() {
      fetch("http://localhost/empleados/?search=" + this.$route.params.id)
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);

          this.employee = data[0];
        })
        .catch(console.log);
    },
    UpdateEmployee() {
      let sendData = {
        id: this.$route.params.id,
        name: this.employee.name,
        email: this.employee.email,
      };

      fetch("http://localhost/empleados/?update=" + this.$route.params.id, {
        method: "POST",
        body: JSON.stringify(sendData),
      })
        .then((response) => {
          response.json();
        })
        .then((data) => {
          console.log(data);
          window.location.href = "/";
        })
        .catch(console.error);
    },
  },
};
</script>

<style scoped></style>
