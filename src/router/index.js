import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/create",
        name: "Create",
        component: () =>
            import ( /* webpackChunkName:"Create" */ "../views/Create.vue"),
    },
    {
        path: "/edit",
        name: "Edit",
        component: () =>
            import ( /* webpackChunkName:"Edit" */ "../views/Edit.vue"),
    },
    {
        path: "/",
        name: "List",
        component: () =>
            import ( /* webpackChunkName:"List" */ "../views/List.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;