import type { BaseEntity } from "./baseEntity.types";
/**
 data model for any documents in `anniversaries` collection

 @extends BaseEntity
 */
export interface AnniversaryEntity extends BaseEntity {
  /** check allowed values at {@link AnniversaryType} */
  anniversaryType: AnniversaryType;
  customTypeValue?: string;
  date: Date;
}

/**
 * allowed enum to distinguish the anniversary type
 */
type AnniversaryType = "first_met" | "annual" | "marry" | "birthday" | "custom";
