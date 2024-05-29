import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import GamePage from "../pages/GamePage.vue";

const routes = [
    { path: "/", component: HomePage},
    { path: "/game", component: GamePage}
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});