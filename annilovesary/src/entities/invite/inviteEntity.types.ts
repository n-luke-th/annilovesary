import { Timestamp } from "firebase/firestore";
import type { BaseEntity } from "../baseEntity.types";
/**
 data model for documents in `invites` collection
 * for saving and verify the invite link (token)
 *
 * // TODO: ensure to have an Index on `token` and `shortCode`. This allows to find the invite instantly when someone scans the QR code without scanning entire database.
  * @extends BaseEntity see {@link BaseEntity}
  */
export interface InviteEntity<ExtraDataT = Record<string, unknown> | null> extends BaseEntity {
  generatedByUserId: string;
  // generatedAt: Timestamp; => omit as in the service file will auto insert `createdAt` at the creation time.

  /** check allowed values at {@link InviteType} */
  inviteType: InviteType;
  visibility: InviteVisibility;

  /* blockchain & security */
  token: string; // The Minted Token ID or Transaction Hash
  secretHash: string | null; // For future "secret" validation (SHA-256)

  /* Usage & Logic */
  invalidAfter: number; // Unix timestamp
  maxUses: number; // 1 for one-time, 0 for unlimited, >1 for multi-use
  currentUses: number; // Current scan count
  isConsumed: boolean; // Quick flag for one-time invites

  /** The "Metadata Bag" */
  extraData: ExtraDataT;

  /** Display Metadata */
  desc: string | null;
  shortCode: string; // A short slug for the URL (e.g., annilovesary.app/i/xyz)
}

/**
 * allowed values to distinguish the Invite visibility
 */
type InviteVisibility = "private" | "public" | "other";

/**
 * allowed values to distinguish the Invite type
 */
type InviteType = "normal" | "campaign" | "other";
