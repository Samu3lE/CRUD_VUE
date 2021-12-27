<template>
  <div>
    <v-text-field
      :label="label"
      :hint="hint"
      persistent-hint
      v-model="inputValue"
      @change="onChange"
      @keyup="onChange"
    ></v-text-field>

    <template v-if="errors.length">
      <ul>
        <li
          v-for="(item, index) in errors"
          :key="index"
          :value="item"
          :class="[errors.length ? 'invalid-feedback-custom-label ' : '']"
        >
          {{ item }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
      default: "",
    },
    errors: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props, ctx) {
    const inputValue = ref(props.value);

    const onChange = (event) => {
      const val = event.target.value;
      ctx.emit("update:modelValue", val);
    };
    return {
      onChange,
      inputValue,
    };
  },
};
</script>

<style>
.invalid-feedback-custom-label {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
