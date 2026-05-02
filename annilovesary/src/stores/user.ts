import type { LoginFormData } from "@/common/types/auth.types";
import type { PartnerInfo, UserPref, UserEntity } from "@/entities/userEntity.types";
import { auth } from "@/firebaseService/firebaseService";
import { userService } from "@/firebaseService/firestore/services";
import type { CreateDoc } from "@/firebaseService/firestore/types/createDoc.types";
import { FirebaseError } from "firebase/app";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { serverTimestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * a store for managing authenticated user data and the user data that stored in `users` collection in Firestore.
 *
 * authenticated user data is managed by Firebase auth, which refer in the store as `authUser`.
 *
 * user data is data that can't be stored in Firebase auth, such as the selected anniversary and partner info, which is stored in `users` collection in Firestore, and refer in the store as `docUser`.
 *
 * @remarks (migrated and combined from account store as it's more accurate to describe the data it manages)
 */
export const useUserStore = defineStore("user", () => {
  const authUser = ref<User | undefined>();
  const isAuthenticated = ref<boolean>(false);
  const docUser = ref<UserEntity | undefined>();
  const userPref = ref<UserPref | undefined>();
  const userPartner = ref<PartnerInfo | undefined>();

  function resetUserStore() {
    docUser.value = undefined;
    userPref.value = undefined;
    userPartner.value = undefined;
    authUser.value = undefined;
    isAuthenticated.value = false;
  }

  function _checkIsCorrectUser(userId: string) {
    if (auth.currentUser?.uid !== userId || auth.currentUser.uid != authUser.value?.uid) {
      throw new Error("unauthorized access to user data!");
    }
  }

  function setAll(usrObj: UserEntity): UserEntity {
    docUser.value = usrObj;
    userPartner.value = usrObj.partnerInfo;
    userPref.value = usrObj.userPref;
    return docUser.value;
  }
  function setPref(usrPref: UserPref): UserPref {
    userPref.value = usrPref;
    return userPref.value;
  }
  function setPartner(usrPartner: PartnerInfo): PartnerInfo {
    userPartner.value = usrPartner;
    return userPartner.value;
  }

  const getAccountCreationTimeAsDate = () => {
    if (authUser.value?.metadata?.creationTime) {
      return new Date(authUser.value?.metadata.creationTime);
    }
  };
  const getAccountLastSignInTimeAsDate = () => {
    if (authUser.value?.metadata?.lastSignInTime) {
      return new Date(authUser.value?.metadata.lastSignInTime);
    }
  };

  async function checkAuthState(): Promise<boolean> {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (u) => {
        if (u) {
          authUser.value = u;
          isAuthenticated.value = true;
          resolve(true);
        } else {
          resetUserStore();
          resolve(false);
        }
      });
    });
  }

  async function login({ email, password }: LoginFormData) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      authUser.value = result.user;
      await createDocUserIfNotExist(result.user.uid);
      console.log("user store: login successful");
    } catch (error) {
      // console.warn(`email + pwd: '${email}', '${password}'`);
      if (error instanceof FirebaseError) {
        throw new Error(`${error.code}: ${error.message}`);
      } else {
        throw new Error("user store: unknown error raised!");
      }
    } finally {
      console.log("user store: login completed");
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      console.log("user store: logout successful");
    } catch (error) {
      console.error("user store:", error);
    } finally {
      resetUserStore();
      console.log("user store: logout completed");
    }
  }

  /**
   *
   * @param userId
   * @returns
   */
  async function createDocUserIfNotExist(userId: string): Promise<string | UserEntity> {
    const userObject = await userService.getById(userId);
    if (userObject) {
      setAll(userObject);
      return docUser.value!;
    } else {
      const newDoc: CreateDoc<UserEntity> = {
        selectedAnniversaryId: null,
        partnerInfo: {
          partnerUserId: null,
          displayName: null,
          lastUpdated: serverTimestamp(),
        },
        userPref: {
          favLang: null,
          favTheme: null,
        },
      };
      const createdDocId = await userService.createWithId(newDoc, userId);
      return createdDocId;
    }
  }

  async function getUser(userId: string): Promise<UserEntity> {
    _checkIsCorrectUser(userId);
    if (typeof docUser.value !== "undefined") {
      return docUser.value.id === userId
        ? docUser.value
        : Promise.reject(new Error("user id mismatch!"));
    }
    const userObj = await userService.getById(userId);
    if (userObj) {
      docUser.value = userObj;
      return docUser.value;
    } else {
      throw new Error(`user with id ${userId} not found!`);
    }
  }

  async function getUserPref(userId: string): Promise<UserPref | undefined> {
    _checkIsCorrectUser(userId);
    if (typeof userPref.value !== "undefined") {
      return userPref.value;
    }
    if (typeof docUser.value !== "undefined") {
      setPref(docUser.value.userPref);
      return userPref.value;
    } else {
      const userObj = await getUser(userId);
      if (userObj) {
        if (typeof userObj.userPref === "undefined") {
        }
        setPref(userObj.userPref);
        return userPref.value;
      }
      return undefined;
    }
  }

  async function getUserPartner(userId: string): Promise<PartnerInfo | undefined> {
    _checkIsCorrectUser(userId);
    if (typeof userPartner.value !== "undefined") {
      return userPartner.value;
    }
    if (typeof docUser.value !== "undefined") {
      setPartner(docUser.value.partnerInfo);
      return userPartner.value;
    } else {
      const userObj = await getUser(userId);
      if (userObj) {
        setPartner(userObj.partnerInfo);
        return userPartner.value;
      }
    }
  }

  return {
    createDocUserIfNotExist,
    getUser,
    getUserPref,
    getUserPartner,
    docUser,
    userPref,
    userPartner,
    resetUserStore,
    login,
    logout,
    checkAuthState,
    getAccountCreationTimeAsDate,
    getAccountLastSignInTimeAsDate,
    isAuthenticated,
    authUser,
  };
});
