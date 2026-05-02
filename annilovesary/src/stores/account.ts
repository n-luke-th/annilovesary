import { defineStore } from "pinia";
import { auth } from "@/firebaseService/firebaseService";
import { type User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import type { LoginFormData } from "@/common/types/auth.types";
import { useUserStore } from "./user";

/**
 * option style store for managing account
 */
export const useAccountStore = defineStore("account", {
  state: () => ({
    user: undefined as User | undefined,
    isAuthenticated: false,
  }),
  getters: {
    getAccountCreationTimeAsDate: (state) => {
      if (state.user?.metadata?.creationTime) {
        return new Date(state.user?.metadata.creationTime);
      }
    },
    getAccountLastSignInTimeAsDate: (state) => {
      if (state.user?.metadata?.lastSignInTime) {
        return new Date(state.user?.metadata.lastSignInTime);
      }
    },
  },
  actions: {
    async checkAuthState() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (u) => {
          if (u) {
            this.user = u;
            this.isAuthenticated = true;
            resolve(true);
          } else {
            this.$reset();
            resolve(false);
          }
        });
      });
    },
    async login({ email, password }: LoginFormData) {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        this.user = result.user;
        const userStore = useUserStore();
        await userStore.createIfNotExist(result.user.uid);
        console.log("account store: login successful");
      } catch (error) {
        // console.warn(`email + pwd: '${email}', '${password}'`);
        if (error instanceof FirebaseError) {
          throw new Error(`${error.code}: ${error.message}`);
        } else {
          throw new Error("account store: unknown error raised!");
        }
      } finally {
        console.log("account store: login completed");
      }
    },
    async logout() {
      const userStore = useUserStore();
      userStore.resetUserStore();
      try {
        await signOut(auth);
        console.log("account store: logout successful");
      } catch (error) {
        console.error("account store:", error);
      } finally {
        this.$reset();
        console.log("account store: logout completed");
      }
    },
  },
});
