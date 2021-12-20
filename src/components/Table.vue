<template>
  <div class="table-responsive">
    <table class="table table-hover table-responsive">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody v-if="list" ref="table">
        <tr v-for="row of list" :key="row.id">
          <td v-for="column in columns" :key="column.field">
            <slot
              name="custom"
              :data-row="row"
              :data-field="column.field"
              :data-field-exact="row?.[column.field]"
            ></slot>
            <!-- <div>
              {{ propFromString(column, row[column.field]) }}
            </div> -->
          </td>
          <!-- {{ row }} -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export const props = {
  columns: {
    type: Array,
    required: true,
  },
  list: {
    type: Array,
    default: [],
  },
};

export default {
  props,
  data() {},
  methods: {
    propFromString(column, data) {
      let result = "";
      if (typeof data === "object") {
        if (column?.search_object) {
          result = data[column?.search_object];
        }
      } else if (typeof data === "string" || typeof data === "number") {
        result = data;
      }

      return result;
    },
  },
};
</script>
