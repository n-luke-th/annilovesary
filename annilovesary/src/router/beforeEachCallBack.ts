import { useUserStore } from "@/stores/user";
import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

interface CallBackModel {
  to: RouteLocationNormalizedGeneric;
  from: RouteLocationNormalizedLoadedGeneric;
}

export async function authGuard({ to, from }: CallBackModel) {
  const userStore = useUserStore();
  await userStore.checkAuthState();
  // console.log("Navigating to:", to.name, "Auth:", accountStore.isAuthenticated);
  if (to.meta.requiresAuth && !userStore.isAuthenticated && to.name !== "login") {
    // if (to.name !== "logoutSuccess" && !userStore.isAuthenticated && to.name !== "login") {
    return { name: "login", replace: true };
  }
}

export async function loginRedirect({ to, from }: CallBackModel) {
  const userStore = useUserStore();
  await userStore.checkAuthState();
  // console.log("Navigating to:", to.name, "Auth:", accountStore.isAuthenticated);
  if (userStore.isAuthenticated && to.name === "login") {
    return { name: "home", replace: true };
  }
}

export async function logoutGuard({ to, from }: CallBackModel) {
  const userStore = useUserStore();
  await userStore.checkAuthState();
  if (userStore.isAuthenticated && to.name === "logoutSuccess") {
    return from.fullPath;
  }
}
