<template>
  <!-- Modal-Form -->

  <v-row justify="center">
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>
          <!-- title -->
          <slot name="title">
            <span class="text-h5">Title</span>
          </slot>
          <slot name="header"></slot>
        </v-card-title>
        <!-- body -->

        <v-card-text>
          <v-container>
            <slot name="body"></slot>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <!-- actions -->

        <v-card-actions>
          <v-spacer></v-spacer>
          <slot name="action-close">
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              Close
            </v-btn>
          </slot>
          <slot name="actions"></slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export const props = {
  custom: {
    type: Object,
    default: {
      bg: {
        header: "",
        body: "",
        footer: "",
      },
      size: "default",
    },
  },
};

export default {
  props,
  emits: ["close"],
  data() {
    return {
      dialog: false,
      modal: null,
    };
  },
  components: {},
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.$emit("close");
      this.dialog = false;
    },
  },
  mounted() {},
};
</script>

<style scoped>
.v-card-actions {
  display: inherit;
  text-align: center;
}

.v-container {
  width: 35vw;
}
@media screen and (min-width: 1024px) {
  .v-container {
    width: 20vw;
  }
}
</style>
