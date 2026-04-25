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
  if (to.name !== "logoutSuccess" && !accountStore.isAuthenticated && to.name !== "login") {
    return { name: "login", replace: true };
  }
}

export async function loginRedirect({ to, from }: CallBackModel) {
  const accountStore = useAccountStore();
  if (accountStore.isAuthenticated && to.name === "login") {
    return { name: "home", replace: true };
  }
}
