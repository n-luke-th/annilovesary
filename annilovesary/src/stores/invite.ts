import { defineStore } from "pinia";
import { inviteService } from "@/firebaseService/firestore/services";
import {
  increment,
  serverTimestamp,
  type DocumentData,
  DocumentReference,
} from "firebase/firestore";
import type { ClaimEntity } from "@/entities/invite/claimEntity.types";

export const useInviteStore = defineStore("invite", () => {
  const redeemMultiUseInvite = async (inviteId: string, userId: string) => {
    try {
      await inviteService.runAtomic(async (transaction) => {
        // 1. Get references using the service helpers
        const inviteRef = inviteService.getDocRef(inviteId);
        const claimRef = inviteService.getUntypedSubDocRef(
          inviteId,
          "claims",
          userId,
        ) as DocumentReference<ClaimEntity, DocumentData>;

        // 2. Perform the read within the transaction
        const inviteDoc = await transaction.get(inviteRef);

        if (!inviteDoc.exists()) throw new Error("Invite missing");

        const data = inviteDoc.data()!; // Typed as InviteEntity automatically
        const now = Math.floor(Date.now() / 1000);

        // 3. Validations
        if (now > data.invalidAfter) throw new Error("Invite expired");

        if (data.maxUses > 0 && data.currentUses >= data.maxUses) {
          throw new Error("Invite full");
        }

        // 4. Atomic Updates
        transaction.update(inviteRef, {
          currentUses: increment(1),
          updatedAt: serverTimestamp(), // Keeping consistency with your create() method
        });

        transaction.set(claimRef, {
          claimedAt: serverTimestamp(),
          userId: userId,
        });
      });

      return { success: true };
    } catch (e) {
      console.error("Redemption failed:", e);
      throw e;
    }
  };
  return { redeemMultiUseInvite };
});
