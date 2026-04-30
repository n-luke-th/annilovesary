import type { Timestamp } from "firebase/firestore";
import type { BaseEntity } from "./baseEntity.types";

/**
 * allowed values to distinguish the anniversary type
 */
type CardType = "default" | "custom";

/**
 data model for documents in `anniversary_cards` collection

 @extends BaseEntity see {@link BaseEntity}
 */
export interface AnniversaryCardEntity extends BaseEntity {
  fromUserId: string;
  toUserId: string;
  validAfter: Timestamp;
  /** check allowed values at {@link CardType} */
  cardType: CardType;
  title: string;
  desc: string | null;
  obj: Record<string, unknown>;
}
