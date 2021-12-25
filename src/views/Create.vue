<template>
  <Modal ref="modal" @close="close">
    <template v-slot:title>
      <span class="text-h5">Datos Empleado</span>
    </template>

    <template v-slot:body>
      <v-row>
        <v-col cols="12">
          <InpuText
            label="Legal name*"
            hint=""
            v-model.trim.lazy="employee.name"
            :value="employee.name"
            :errors="formValuesErrors.name"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <InpuText
            label="Email*"
            hint=""
            v-model.trim.lazy="employee.email"
            :value="employee.email"
            :errors="formValuesErrors.email"
          />
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
import validations from "@/validationsForm/crud/ValidationsForm";
import Modal from "@/components/ModalForm.vue";
import InpuText from "@/components/InputText.vue";

export default {
  components: { Modal, InpuText },
  setup(props, ctx) {
    const store = useStore();

    const employee = ref({});

    const formValuesErrors = ref({});

    const employeeEvent = async () => {
      try {
        await validations.schemaCreate.validate(employee.value, {
          abortEarly: false,
        });

        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await CreateEmployee(employee.value);
        } catch (err) {
          if (err?.errors) {
            for (const key in formValuesErrors.value) {
              formValuesErrors.value[key] = [];
            }

            const { errors } = err;
            for (const error in errors) {
              formValuesErrors.value[error] = err.errors[error];
            }
          }
        }
      } catch (err) {
        console.log("createEvent -> catch", err);
        formValuesErrors.value = validations.getErrorsFromYup({
          arr: formValuesErrors.value,
          err,
        });
      }
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
      formValuesErrors,
    };
  },
};
</script>

<style scoped></style>
