import { createRouter, createWebHistory } from "vue-router";

const routes = [{
        path: "/create",
        name: "Create",
        component: () =>
            import ( /* webpackChunkName:"Create" */ "../components/Create.vue"),
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: () =>
            import ( /* webpackChunkName:"Edit" */ "../components/Edit.vue"),
    },
    {
        path: "/",
        name: "List",
        component: () =>
            import ( /* webpackChunkName:"List" */ "../components/List.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;