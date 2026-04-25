import { defineStore } from "pinia";
import { collection, getDoc, doc, addDoc, getDocs, FirestoreError } from "firebase/firestore";
import { firestore } from "@/firebaseService/firebaseService";
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { FirestoreCollection } from "@/common/firestoreCollections";
import { FirebaseError } from "firebase/app";

/**
 * option style store for managing anniversary
 */
export const useAnniversaryStore = defineStore("anniversary", {
  state: () => ({
    anniversaries: undefined as AnniversaryEntity[] | undefined,
    anniversary: undefined as AnniversaryEntity | undefined,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    async createNewAnniversary(data: AnniversaryEntity, userId: string): Promise<string> {
      try {
        const collectionRef = collection(firestore, FirestoreCollection.ANNIVERSARY.collectionName);
        const docRef = await addDoc(collectionRef, data);
        return docRef.id;
      } catch (error) {
        console.error("anniversary store:", error);
        if (error instanceof FirebaseError) {
          throw new Error(`${error.code}: ${error.message}`);
        } else {
          throw new Error("unknown error when creating new anniversary");
        }
      }
    },
    async getAnniversary(docId: string): Promise<AnniversaryEntity | undefined> {
      try {
        const docRef = doc(firestore, FirestoreCollection.ANNIVERSARY.collectionName, docId);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          data.mt.createdAt = data.mt.createdAt.toDate();
          data.mt.updatedAt = data.mt.updatedAt.toDate();
          data.date = data.date.toDate();
          this.anniversary = data as AnniversaryEntity;
        } else {
          this.anniversary = undefined;
        }
        return this.anniversary;
      } catch (error) {
        if (error instanceof FirestoreError) {
          console.error(`${error.code}: ${error.message}`);
        } else {
          console.error("unknown error raised!", error);
          throw new Error("unknown error when get an anniversary");
        }
      }
    },

    async getAnniversaries(userId: string): Promise<AnniversaryEntity[] | undefined> {
      try {
        const collectionRef = collection(firestore, FirestoreCollection.ANNIVERSARY.collectionName);
        const snapshot = await getDocs(collectionRef);
        const anniversaries = snapshot.docs.map((doc) => {
          const data = doc.data();
          data.mt.createdAt = data.mt.createdAt.toDate();
          data.mt.updatedAt = data.mt.updatedAt.toDate();
          data.date = data.date.toDate();
          return data;
        }) as AnniversaryEntity[];

        return anniversaries;
      } catch (error) {
        if (error instanceof FirestoreError) {
          console.error(`${error.code}: ${error.message}`);
        } else {
          console.error("unknown error raised!", error);
        }
        return undefined;
      }
    },

    async updateAnniversary(docId: string, updatedData: AnniversaryEntity) {},
  },
});
