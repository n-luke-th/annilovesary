import { defineStore } from "pinia";
import { FirestoreError } from "firebase/firestore";
import type { AnniversaryEntity } from "@/entities/anniversaryEntity.types";
import { FirebaseError } from "firebase/app";
import { anniversaryService } from "@/firebaseService/firestore/services";
import type { CreateDoc } from "@/firebaseService/firestore/types/createDoc.types";

/**
 * option style store for managing anniversary
 */
export const useAnniversaryStore = defineStore("anniversary", {
  state: () => ({
    anniversaries: undefined as AnniversaryEntity[] | undefined,
    anniversary: undefined as AnniversaryEntity | undefined,
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

    async getAnniversaries(): Promise<AnniversaryEntity[] | undefined> {
      try {
        const anniversaries = await anniversaryService.getAll();
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
    },

    async updateAnniversary(docId: string, updatedData: Partial<AnniversaryEntity>): Promise<void> {
      await anniversaryService.update(docId, updatedData);
    },

    async deleteAnniversary(docId: string) {
      await anniversaryService.delete(docId);
    },
  },
});
