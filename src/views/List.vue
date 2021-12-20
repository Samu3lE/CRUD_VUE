<template>
  <div class="container">
    <router-link to="/create" class="btn btn-outline-warning btn-crear"
      >Crear Nuevo Empleado</router-link
    >

    <div class="card">
      <div class="card-header">Empleados</div>
      <div class="card-body">
        <TableCustom
          ref="EmployeesList"
          :columns="[
            {
              label: 'N°',
              field: 'id',
            },
            {
              label: 'Nombre',
              field: 'name',
            },

            {
              label: 'Correo',
              field: 'email',
            },
            {
              label: 'Acciones',
              field: 'Actions',
            },
          ]"
          :list="employees"
        >
          <template v-slot:custom="{ dataRow, dataField, dataFieldExact }">
            <template v-if="dataField === 'Actions'">
              <div class="btn-group" role="group" aria-label="">
                <button
                  v-on:click="showAlertUpdate(dataRow)"
                  class="btn btn-outline-info"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  v-on:click="showAlertDelete(dataRow)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />
                  </svg>
                </button>
              </div>
            </template>
            <template v-else>
              {{ dataFieldExact }}
            </template>
          </template>
        </TableCustom>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import Swal from "sweetalert2";

import TableCustom from "@/components/Table.vue";

export default {
  name: "ListEmployees",
  components: {
    TableCustom,
  },

  setup() {
    const store = useStore();
    const router = useRouter();
    const EmployeesList = ref(null);

    console.log(EmployeesList);
    console.log(TableCustom);
    onMounted(() => {
      store.dispatch("crudStore/SearchEmployees");
    });
    const employees = computed(() => store.state.crudStore.entries);

    const showAlertUpdate = (idEmployee) => {
      // useRouter().push({ name: "entry", params: { id: idEmployee } });
      // window.location.href = `/edit/:${idEmployee}`;
      router.push({
        name: "Edit",
        query: {
          id: idEmployee,
        },
      });
    };

    const showAlertDelete = async ({ id: idEmployee }) => {
      const { isConfirmed } = await Swal.fire({
        title: "¿Está seguro?",
        text: "Una vez borrado, no se puede recuperar!",
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
        const deleted = await deleteEmployee(idEmployee);
        if (deleted) {
          await Swal.fire(
            "Eliminado!",
            "La entrada ha sido eliminada",
            "success"
          );
          router.go();
        } else {
          Swal.fire("Oops!", "La entrada no ha sido eliminada", "error");
        }
      }
    };

    const deleteEmployee = async (idEmployee) => {
      try {
        let deleteData = await store.dispatch(
          "crudStore/DeleteEmployee",
          idEmployee
        );
        console.log("datos luego de eliminar", deleteData);
        return true;
      } catch (error) {
        console.error("Error Delete", error);
        return false;
      }
    };

    return {
      employees,
      showAlertDelete,
      showAlertUpdate,
      deleteEmployee,
    };
  },
};
</script>

<style scoped>
.btn {
  margin: 0 0.5em;
}
.btn-crear {
  margin-bottom: 1rem;
}
</style>
