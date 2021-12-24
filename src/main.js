import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { loadFonts } from "./plugins/webfontloader";

import "vuetify/styles";
import { createVuetify } from "vuetify";

// import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "./styles/style.css";
import "./styles/bootstrap.min.css";

loadFonts();

const app = createApp(App);
const vuetify = createVuetify();

app.use(vuetify);
app.use(router);
app.use(store);
// app.use(VueSweetalert2);
app.use(vuetify);
app.mount("#app");