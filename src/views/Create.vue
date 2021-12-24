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
import { ref } from "vue";
import { useStore } from "vuex";

import Swal from "sweetalert2";

import Modal from "@/components/ModalForm.vue";

export default {
  components: { Modal },
  setup(props, ctx) {
    const store = useStore();

    const employee = ref({});

    const employeeEvent = async () => {
      await CreateEmployee(employee.value);
    };

    const CreateEmployee = async (sendData) => {
      try {
        const Created = await store.dispatch(
          "crudStore/CreateEmployee",
          sendData
        );

        if (Created) {
          const isConfirm = await Swal.fire(
            "Registrado!",
            "El empleado ha sido registrado exitosamente",
            "success"
          );

          if (isConfirm) {
            modal.value.close();
            ctx.emit("finishSuccess");
          }
          // router.push({ name: "List" });
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

    const modal = ref(null);
    const open = () => {
      console.log("entra Open");
      for (const key in employee.value) {
        employee.value[key] = "";
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
