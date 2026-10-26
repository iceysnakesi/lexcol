import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useAuthStore } from "@/stores/authStore";
import HomeLayout from "@/layouts/HomeLayout.vue";
import Dashboard from "@/views/Dashboard.vue";
import About from "@/views/About.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/Register.vue";
import AdminView from "@/views/AdminPanel.vue";

const routes = [
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "",
        redirect: "/about"
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true } // Optional: protect dashboard too if needed
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
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: { requiresAdmin: true }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard
router.beforeEach((to) => {
  const authStore = useAuthStore();

  // Check if route requires admin access
  if (to.meta.requiresAdmin) {
    const userRoles = authStore.user?.role || [];
    if (!authStore.isAuthenticated || !userRoles.includes('admin')) {
      return { name: 'Login' }; // Redirects to Login
    }
  }

  // Check if route requires standard authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login' }; // Redirects to Login
  }
});

export default router;