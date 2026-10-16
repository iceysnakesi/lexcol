import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "@/layouts/HomeLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import About from "@/views/About.vue";
import LoginView from "@/views/LoginView.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeLayout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
