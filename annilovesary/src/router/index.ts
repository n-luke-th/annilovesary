import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { authGuard, loginRedirect } from "./beforeEachCallBack";
import AnniversaryDetailView from "@/views/anniversary/AnniversaryDetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/auth/LoginView.vue"),
    },
    { path: "/home", redirect: "/" },
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/anniversary",
      name: "anniversary",
      children: [
        {
          path: "new",
          name: "newAnniversary",
          component: () => import("@/views/anniversary/NewAnniversaryView.vue"),
        },
        {
          path: "list",
          name: "listAnniversary",
          component: () => import("@/views/anniversary/AnniversaryListView.vue"),
        },
        {
          path: "details/:docId",
          name: "anniversaryDetail",
          component: AnniversaryDetailView, // can't use lazy import as it gone back to list view after it touched the detail view
        },
      ],
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/logout",
      name: "logout",
      component: () => import("@/views/auth/LogoutView.vue"),
    },
    {
      path: "/logout-success",
      name: "logoutSuccess",
      component: () => import("@/views/auth/LogoutSuccessView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  // add beforeEach callback here.
  return await authGuard({ from: from, to: to });
});

router.beforeEach(async (to, from) => {
  // add beforeEach callback here.
  return await loginRedirect({ from: from, to: to });
});

export default router;
