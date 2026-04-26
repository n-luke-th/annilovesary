import type { BaseWriteEntity, BaseReadEntity } from "./baseEntity.types";
/**
 data model for any documents in `anniversary_events` collection

 @extends BaseReadEntity
 */
export interface AnniversaryEventEntity extends BaseReadEntity {
  [key: string]: unknown;
}

/**
 data model for create any documents in `anniversary_events` collection
 @extends BaseWriteEntity
 */
export interface AnniversaryEventWriteEntity extends BaseWriteEntity {
  [key: string]: unknown;
}
