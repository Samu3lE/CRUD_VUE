import { createStore } from "vuex";

import crudStore from "../modules/crud";

const store = createStore({
    modules: {
        crudStore,
    },
});

export default store;