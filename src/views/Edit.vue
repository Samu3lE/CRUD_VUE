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
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Modal from "@/components/ModalForm.vue";
import InpuText from "@/components/InputText.vue";
import ConfirmAlert from "@/components/ConfirmAlert";
import {
  schemaCreate,
  getErrorsFromYup,
} from "@/validationsForm/crud/ValidationsForm";

export default {
  components: { Modal, InpuText },
  setup(props, ctx) {
    const store = useStore();
    let sendData = {};

    const employee = computed(() => store.state.crudStore.employee);

    const formValuesErrors = ref({});

    const employeeEvent = async () => {
      sendData["name"] = employee.value.name;
      sendData["email"] = employee.value.email;

      try {
        await schemaCreate.validate(sendData, {
          abortEarly: false,
        });

        for (const key in formValuesErrors.value) {
          formValuesErrors.value[key] = [];
        }
        try {
          await updateEmployee(sendData);
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

    const updateEmployee = async (sendData) => {
      const isConfirmed = await ConfirmAlert.confirmAlert({
        title: "¿Está seguro?",
        text: "Los datos del empleado serán actualizados!",
        icon: "warning",
      });

      if (isConfirmed) {
        await ConfirmAlert.loadMessage();
        await ConfirmAlert.showLoading();

        try {
          const updated = await store.dispatch(
            "crudStore/UpdateEmployee",
            sendData
          );

          if (updated) {
            await ConfirmAlert.confirmSuccess({
              title: "Actualizado!",
              text: "La entrada ha sido actualizada",
              icon: "success",
            });

            modal.value.close();
            ctx.emit("finishSuccess");
          } else {
            ConfirmAlert.confirmError(
              "Los datos no fueron actualizados: " + updated
            );
          }
        } catch (error) {
          ConfirmAlert.confirmError(
            "Los datos no fueron actualizados: " + error
          );
        }
      }
    };

    const modal = ref(null);
    const open = async ({ idEmployee }) => {
      sendData["id"] = idEmployee;

      try {
        await store.dispatch("crudStore/SearchEmployeesByID", idEmployee);
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
      formValuesErrors,
    };
  },
};
</script>

<style scoped></style>
