import { useAccountStore } from "@/stores/account";
import type {
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";

interface CallBackModel {
  to: RouteLocationNormalizedGeneric;
  from: RouteLocationNormalizedLoadedGeneric;
}

export async function authGuard({ to, from }: CallBackModel) {
  const accountStore = useAccountStore();
  await accountStore.checkAuthState();
  console.log("Navigating to:", to.name, "Auth:", accountStore.isAuthenticated);
  if (to.name !== "logoutSuccess" && !accountStore.isAuthenticated && to.name !== "login") {
    return { name: "login", replace: true };
  }
}

export async function loginRedirect({ to, from }: CallBackModel) {
  const accountStore = useAccountStore();
  console.log("Navigating to:", to.name, "Auth:", accountStore.isAuthenticated);
  if (accountStore.isAuthenticated && to.name === "login") {
    return { name: "home", replace: true };
  }
}
