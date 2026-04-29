import type { BaseEntity } from "./baseEntity.types";

/**
 * allowed values to distinguish the anniversary type
 */
type AnniversaryType = "first_met" | "annual" | "marry" | "birthday" | "custom";

/**
 data model for documents in `anniversaries` collection

 @extends BaseEntity
 */
export interface AnniversaryEntity extends BaseEntity {
  partnerIds: string[];
  /** check allowed values at {@link AnniversaryType} */
  anniversaryType: AnniversaryType;
  customTypeValue: string | null;
  date: Date;
  desc: string | null;
}
