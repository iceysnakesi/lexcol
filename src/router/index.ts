import { createRouter, createWebHistory } from "vue-router";
import HomeLayout from "@/layouts/HomeLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import About from "@/views/About.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeLayout,
    children: [
      {
        path: "/Dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/about",
        name: "About",
        component: About,
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
