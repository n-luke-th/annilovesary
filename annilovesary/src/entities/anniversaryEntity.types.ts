import type { BaseEntity } from "./baseEntity.types";
/**
 data model for any documents in `anniversaries` collection

 @extends BaseEntity
 */
export interface AnniversaryEntity extends BaseEntity {
  /** @see AnniversaryType */
  anniversaryType: AnniversaryType;
  date: Date;
}

/**
 * allowed enum to distinguish the anniversary type
 */
enum AnniversaryType {
  firstMet,
  annual,
  marry,
  birthday,
  custom,
}
