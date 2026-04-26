import type { BaseWriteEntity, BaseReadEntity } from "./baseEntity.types";
/**
 data model for any documents in `anniversaries` collection

 @extends BaseReadEntity
 */
export interface AnniversaryEntity extends BaseReadEntity {
  /** check allowed values at {@link AnniversaryType} */
  anniversaryType: AnniversaryType;
  customTypeValue: string | null;
  date: Date;
  desc: string | null;
}

/**
 * allowed values to distinguish the anniversary type
 */
type AnniversaryType = "first_met" | "annual" | "marry" | "birthday" | "custom";

/**
 data model for create any documents in `anniversaries` collection
 @extends BaseWriteEntity
 */
export interface AnniversaryWriteEntity extends BaseWriteEntity {
  anniversaryType: AnniversaryType;
  customTypeValue: string | null;
  date: Date;
  desc: string | null;
  [key: string]: unknown;
}
