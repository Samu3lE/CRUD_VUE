<template>
  <Modal ref="modal" @close="close">
    <template v-slot:title>
      <span class="text-h5">Datos Empleado</span>
    </template>

    <template v-slot:body>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Legal name*"
            hint="example of persistent helper text"
            persistent-hint
            required
            v-model="employee.name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="Email*"
            required
            v-model="employee.email"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <!-- actions -->
    <template v-slot:actions>
      <v-btn
        color="blue darken-1"
        text
        aria-label="Agregar"
        @click="employeeEvent"
      >
        Agregar
      </v-btn>
    </template>
  </Modal>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Swal from "sweetalert2";

import Modal from "@/components/ModalForm.vue";
import ConfirmAlert from "@/components/ConfirmAlert";

export default {
  components: { Modal },
  setup(props, ctx) {
    const store = useStore();
    let sendData = {};

    const employee = computed(() => store.state.crudStore.employee);

    const employeeEvent = async () => {
      sendData["name"] = employee.value.name;
      sendData["email"] = employee.value.email;

      await UpdateEmployee(sendData);
    };

    const UpdateEmployee = async (sendData) => {
      const isConfirmed = await ConfirmAlert.confirmAlert({
        title: "¿Está seguro?",
        text: "Los datos del empleado serán actualizados!",
        icon: "warning",
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

            ctx.emit("finishSuccess");
            modal.value.close();
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

    const modal = ref(null);
    const open = async ({ idEmployee }) => {
      sendData["id"] = idEmployee;
      console.log("Entra con ID", idEmployee);
      try {
        await store.dispatch("crudStore/SearchEmployeesByID", idEmployee);

        console.log("Employee", employee.value);
        console.log("store", store.state.crudStore.employee);
      } catch (error) {
        console.error("Error en la busqueda: ", error);
      }
      modal.value.open();
    };

    return {
      employee,
      open,
      close,
      modal,
      employeeEvent,
    };
  },
};
</script>

<style scoped></style>
