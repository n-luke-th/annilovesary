import type { PartnerInfo, UserPref, UserEntity } from "@/entities/userEntity.types";
import { auth } from "@/firebaseService/firebaseService";
import { userService } from "@/firebaseService/firestore/services";
import type { CreateDoc } from "@/firebaseService/firestore/types/createDoc.types";
import { serverTimestamp } from "firebase/firestore";
import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * a store for managing user data, this is used to manage the user data that stored in `users` collection in Firestore,
 * which is different from the user data that stored in Firebase's auth,
 * this is used to store the user data that can't be stored in Firebase's auth, such as the selected anniversary and partner info
 */
export const useUserStore = defineStore("user", () => {
  const user = ref<UserEntity | undefined>();
  const userPref = ref<UserPref | undefined>();
  const userPartner = ref<PartnerInfo | undefined>();

  function resetUserStore() {
    user.value = undefined;
    userPref.value = undefined;
    userPartner.value = undefined;
  }

  function checkIsCorrectUser(userId: string) {
    if (auth.currentUser?.uid !== userId) {
      throw new Error("unauthorized access to user data!");
    }
  }

  function setAll(usrObj: UserEntity): UserEntity {
    user.value = usrObj;
    userPartner.value = usrObj.partnerInfo;
    userPref.value = usrObj.userPref;
    return user.value;
  }
  function setPref(usrPref: UserPref): UserPref {
    userPref.value = usrPref;
    return userPref.value;
  }
  function setPartner(usrPartner: PartnerInfo): PartnerInfo {
    userPartner.value = usrPartner;
    return userPartner.value;
  }

  /**
   *
   * @param userId
   * @returns
   */
  async function createIfNotExist(userId: string): Promise<string | UserEntity> {
    const userObject = await userService.getById(userId);
    if (userObject) {
      setAll(userObject);
      return user.value!;
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
    checkIsCorrectUser(userId);
    if (typeof user.value !== "undefined") {
      return user.value.id === userId ? user.value : Promise.reject(new Error("user id mismatch!"));
    }
    const userObj = await userService.getById(userId);
    if (userObj) {
      user.value = userObj;
      return user.value;
    } else {
      throw new Error(`user with id ${userId} not found!`);
    }
  }

  async function getUserPref(userId: string): Promise<UserPref | undefined> {
    checkIsCorrectUser(userId);
    if (typeof userPref.value !== "undefined") {
      return userPref.value;
    }
    if (typeof user.value !== "undefined") {
      setPref(user.value.userPref);
      return userPref.value;
    } else {
      const userObj = await getUser(userId);
      if (userObj) {
        setPref(userObj.userPref);
        return userPref.value;
      }
      return undefined;
    }
  }

  async function getUserPartner(userId: string): Promise<PartnerInfo | undefined> {
    checkIsCorrectUser(userId);
    if (typeof userPartner.value !== "undefined") {
      return userPartner.value;
    }
    if (typeof user.value !== "undefined") {
      setPartner(user.value.partnerInfo);
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
    createIfNotExist,
    getUser,
    getUserPref,
    getUserPartner,
    user,
    userPref,
    userPartner,
    resetUserStore,
  };
});
