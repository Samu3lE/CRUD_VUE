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

import {
  schemaCreate,
  getErrorsFromYup,
} from "@/validationsForm/crud/ValidationsForm";

import Modal from "@/components/ModalForm.vue";
import InpuText from "@/components/InputText.vue";
import ConfirmAlert from "@/components/ConfirmAlert";

export default {
  components: { Modal, InpuText },
  setup(props, ctx) {
    const store = useStore();

    const employee = ref({});

    const formValuesErrors = ref({});

    const createEmployee = async (sendData) => {
      try {
        const created = await store.dispatch(
          "crudStore/CreateEmployee",
          sendData
        );

        if (created) {
          const isConfirm = await ConfirmAlert.confirmSuccess({
            title: "Registrado!",
            text: "El empleado ha sido registrado exitosamente",
            icon: "success",
          });

          if (isConfirm) {
            modal.value.close();

            console.log(ctx.emit("finishSuccess"));
          }
        } else {
          ConfirmAlert.confirmError("El empleado no ha sido registrado");
        }
      } catch (error) {
        ConfirmAlert.confirmError(
          "El empleado no ha sido registrado: " + error
        );
      }
    };

    const employeeEvent = async () => {
      try {
        await schemaCreate.validate(employee.value, {
          abortEarly: false,
        });

        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await createEmployee(employee.value);
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
        formValuesErrors.value = getErrorsFromYup({
          arr: formValuesErrors.value,
          err,
        });
      }
    };

    const modal = ref(null);
    const open = () => {
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
