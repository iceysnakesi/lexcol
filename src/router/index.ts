import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useAuthStore } from "@/stores/authStore";
const HomeLayout = () => import("@/layouts/HomeLayout.vue");
const Dashboard = () => import("@/views/Dashboard.vue");
const About = () => import("@/views/About.vue");
const LoginView = () => import("@/views/LoginView.vue");
const RegisterView = () => import("@/views/Register.vue");
const AdminView = () => import("@/views/AdminPanel.vue");
const ChatBotView = () => import("@/views/ChatBot.vue");
const ForumView = () => import("@/views/Forum.vue");
const NewsView = () => import("@/views/News.vue");
const VideoView = () => import("@/views/Videos.vue");

const routes = [
  {
    path: "/",
    component: HomeLayout,
    children: [
      {
        path: "",
        redirect: "/news"
      },
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { requiresAuth: true }
      },
      {
        path: "about",
        name: "About",
        component: About,
      },
      {
        path: "chatbot",
        name: "ChatBot",
        component: ChatBotView,
      },
      {
        path: "forum",
        name: "Forum",
        component: ForumView,
      },
      {
        path: "news",
        name: "News",
        component: NewsView,
      },
      {
        path: "videos",
        name: "Videos",
        component: VideoView,
      },
      {
        path: "admin",
        name: "Admin",
        component: AdminView,
        meta: { requiresAdmin: true }
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