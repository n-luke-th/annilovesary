import type { Timestamp } from "firebase/firestore";
import type { BaseEntity } from "../baseEntity.types";

export interface ClaimEntity {
  claimedAt: Timestamp;
  userId: null | string;
}
