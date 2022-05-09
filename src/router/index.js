import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import SearchView from "../views/SearchView.vue";
import NotFoundView from "../views/NotFoundView.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView
    }, {
        path: "/category/:category",
        name: "Category",
        component: CategoryView
    }, {
        path: "/search/:term",
        name: "Search",
        component: SearchView
    },
    // catchall 404
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
