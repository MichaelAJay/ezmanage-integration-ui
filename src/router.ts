import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import UserLogin from "./components/UserLogin.vue";
import OrdersList from "./components/OrdersList.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: UserLogin },
  { path: "/orders", component: OrdersList },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
