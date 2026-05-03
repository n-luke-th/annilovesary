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

  const getCurrentUserId = () => auth.currentUser?.uid;

  function _checkIsCorrectUser(userId?: string, deep = true) {
    if (typeof getCurrentUserId() === "undefined") throw new Error("unauthorized");
    if (typeof userId != "undefined" && getCurrentUserId() !== userId) {
      throw new Error("unauthorized");
    }
    if (deep) {
      if (getCurrentUserId() != authUser.value?.uid || docUser.value?.id !== getCurrentUserId()) {
        throw new Error("unauthorized access to user data!");
      }
    }
  }

  /**
   *
   * @param userId
   * @returns
   */
  async function _getAndCreateDocUserIfNotExist(userId: string): Promise<UserEntity> {
    if (docUser.value) {
      return docUser.value;
    }
    const userObject = await userService.getById(userId);
    if (userObject) {
      docUser.value = userObject;
      return docUser.value;
    } else {
      // not exist, creating one
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
      const created = await userService.getById(createdDocId);
      if (created) {
        return created;
      }
      throw new Error("error occured when creating user doc.");
    }
  }

  function _setAll(usrObj: UserEntity, authUsr: User, isAuthen = true) {
    docUser.value = usrObj;
    userPartner.value = usrObj.partnerInfo;
    userPref.value = usrObj.userPref;
    authUser.value = authUsr;
    isAuthenticated.value = isAuthen;
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
      const authUsr = await signInWithEmailAndPassword(auth, email, password);
      const docUsr = await _getAndCreateDocUserIfNotExist(authUsr.user.uid);
      _setAll(docUsr, authUsr.user);
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

  /** get docUser and create one if not exist
   *
   * @returns
   */
  const getDocUser = async (): Promise<UserEntity> => {
    _checkIsCorrectUser(undefined, false);
    if (typeof docUser.value !== "undefined") {
      return docUser.value;
    }
    const uid = getCurrentUserId();
    if (uid) {
      return await _getAndCreateDocUserIfNotExist(uid);
    }
    throw new Error("unauthorized");
  };

  const getUserPref = async (): Promise<UserPref | undefined> => {
    _checkIsCorrectUser(undefined, false);
    if (typeof userPref.value !== "undefined") {
      return userPref.value;
    }
    if (typeof docUser.value !== "undefined") {
      userPref.value = docUser.value.userPref;
      return userPref.value;
    } else {
      const userObj = await getDocUser();
      if (userObj) {
        docUser.value = userObj;
        userPref.value = userObj.userPref;
        return userPref.value;
      }
      return undefined;
    }
  };

  const getUserPartner = async (): Promise<PartnerInfo | undefined> => {
    _checkIsCorrectUser(undefined, false);
    if (typeof userPartner.value !== "undefined") {
      return userPartner.value;
    }
    if (typeof docUser.value !== "undefined") {
      userPartner.value = docUser.value.partnerInfo;
      return userPartner.value;
    } else {
      const userObj = await getDocUser();
      if (userObj) {
        docUser.value = userObj;
        userPartner.value = userObj.partnerInfo;
        return userPartner.value;
      }
    }
  };

  return {
    getDocUser,
    getUserPref,
    getUserPartner,
    // docUser,
    // userPref,
    // userPartner,
    resetUserStore,
    login,
    logout,
    checkAuthState,
    getAccountCreationTimeAsDate,
    getAccountLastSignInTimeAsDate,
    getCurrentUserId,
    isAuthenticated,
    authUser,
  };
});
