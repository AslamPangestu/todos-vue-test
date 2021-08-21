import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TodoList",
    component: () => import("../pages/TodoList"),
  },
  {
    path: "/new",
    name: "AddTodoList",
    component: () => import("../pages/NewTodo"),
  },
  {
    path: "/:id",
    name: "DetailTodoList",
    component: () => import("../pages/DetailTodo"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
