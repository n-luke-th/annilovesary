import { defineStore } from "pinia";
import { FirestoreError, where } from "firebase/firestore";
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { FirebaseError } from "firebase/app";
import { anniversaryService } from "@/firebaseService/firestore/services";
import type { CreateDoc } from "@/firebaseService/firestore/types/createDoc.types";
import { useUserStore } from "./user";

/**
 * option style store for managing anniversary
 */
export const useAnniversaryStore = defineStore("anniversary", {
  state: () => ({
    anniversaries: undefined as AnniversaryEntity[] | undefined,
    anniversary: undefined as AnniversaryEntity | undefined,
    /** user chosen anniversary as default anniversary with their partner */
    selectedAnniversary: undefined as AnniversaryEntity | undefined,
  }),
  getters: {},
  actions: {
    async createNewAnniversary(data: CreateDoc<AnniversaryEntity>): Promise<string> {
      try {
        const anniversaryId = anniversaryService.create(data);
        return anniversaryId;
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
      if (this.anniversary?.id === docId) {
        return this.anniversary;
      }
      try {
        const anniversary = await anniversaryService.getById(docId);
        if (anniversary) {
          this.anniversary = anniversary;
          return this.anniversary;
        }
        return undefined;
      } catch (error) {
        if (error instanceof FirestoreError) {
          console.error(`${error.code}: ${error.message}`);
        } else {
          console.error("unknown error raised!", error);
          throw new Error("unknown error when get an anniversary");
        }
      }
    },

    /**
     * get user chosen anniversary as default anniversary with their partner
     */
    async getSelectedAnniversary(): Promise<AnniversaryEntity | undefined> {
      if (this.selectedAnniversary) {
        return this.selectedAnniversary;
      }
      const userStore = useUserStore();
      const selectedId = (await userStore.getDocUser()).selectedAnniversaryId;
      if (selectedId) {
        const a = await anniversaryService.getById(selectedId);
        if (a) {
          this.selectedAnniversary = a;
          return a;
        }
      }
      return undefined;
    },

    /** get all anniversaries that current user is being part of
     *
     * @returns
     */
    async getAnniversaries(): Promise<AnniversaryEntity[] | undefined> {
      const uid = useUserStore().getCurrentUserId();
      if (uid) {
        try {
          const anniversaries = await anniversaryService.getAll([
            where("partnerIds", "array-contains", uid),
          ]);
          if (anniversaries) {
            this.anniversaries = anniversaries;
            return anniversaries;
          }
          return undefined;
        } catch (error) {
          if (error instanceof FirestoreError) {
            console.error(`${error.code}: ${error.message}`);
          } else {
            console.error("unknown error raised!", error);
          }
          return undefined;
        }
      }
    },

    async updateAnniversary(docId: string, updatedData: Partial<AnniversaryEntity>): Promise<void> {
      await anniversaryService.update(docId, updatedData);
    },

    async deleteAnniversary(docId: string) {
      await anniversaryService.delete(docId);
    },
  },
});
