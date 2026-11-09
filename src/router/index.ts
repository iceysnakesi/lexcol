import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useAuthStore } from "@/stores/authStore";
import { RouteRecordRaw } from 'vue-router';
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
const PostManagementView = () => import("@/views/PostManagement.vue");
const PostDetailsView = () => import("@/views/PostDetail.vue");
const EditProfileView = () => import("@/views/ProfileEdit.vue");
const EditPostView = () => import("@/views/EditPost.vue");
const NewsDetailView = () => import("@/views/NewsDetail.vue");
const CreateNewsView = () => import("@/views/CreateNews.vue");
const ForgotPasswordView = () => import("@/views/ForgotPassword.vue");
const ResetPasswordView = () => import("@/views/ResetPassword.vue");

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
      {
        path: "postmanagement",
        name: "PostManagement",
        component: PostManagementView,
        meta: { requiresAdmin: true }
      },
      {
        path: "forum/edit/:id",
        name: "EditPost",
        component: EditPostView,
        meta: { requiresAdmin: true }
      },
      {
        path: "forum/:id",
        name: "PostDetails",
        component: PostDetailsView,
      },
      {
        path: "your_profile",
        name: "YourProfile",
        component: EditProfileView,
        meta: { requiresAuth: true }
      },
      {
        path: "news",
        name: "News",
        component: NewsView,
      },
      {
        path: "news/create",
        name: "CreateNews",
        component: CreateNewsView,
        meta: { requiresAdmin: true },
      },
      {
        path: "news/:id",
        name: "NewsDetail",
        component: NewsDetailView,
      },
    ],
  },
  {
    path: "/chatbot",
    name: "ChatBot",
    component: ChatBotView,
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
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPasswordView,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Ionic 8 sets aria-hidden="true" on the leaving <ion-page> during transitions.
// If the element that triggered navigation still has focus, Chrome logs
// "Blocked aria-hidden on an element because its descendant retained focus".
// Blur before the route commits so no focused element ends up inside a hidden page.
function blurActiveElement() {
  const active = document.activeElement as HTMLElement | null;
  if (!active) return;

  active.blur?.();

  // Ionic components render a native <button> inside their shadow root.
  // document.activeElement points at the host; blur the deep element too.
  const deepActive = active.shadowRoot?.activeElement as HTMLElement | null;
  deepActive?.blur?.();
}

// Navigation Guard
router.beforeEach((to) => {
  const authStore = useAuthStore();

  // Check if route requires admin access
  if (to.meta.requiresAdmin) {
    if (!authStore.isAuthenticated || authStore.user?.role !== 'admin') {
      return { name: 'Login' };
    }
  }

  // Check if route requires standard authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { name: 'Login' }; // Redirects to Login
  }
});

export default router;