import type { BaseEntity } from "./baseEntity.types";

/**
 * allowed values to distinguish the anniversary type
 */
type AnniversaryType = "first_met" | "annual" | "marry" | "birthday" | "custom";

/**
 data model for documents in `anniversaries` collection

 @extends BaseEntity see {@link BaseEntity}
 */
export interface AnniversaryEntity extends BaseEntity {
  partnerIds: string[];
  /** check allowed values at {@link AnniversaryType} */
  anniversaryType: AnniversaryType;
  customTypeValue: string | null;
  date: Date;
  isDateIncludeTime: boolean | null;
  desc: string | null;
}
