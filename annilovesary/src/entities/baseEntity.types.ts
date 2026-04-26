/**
 * base data model for any Firestore collections
 *
 * @property id: unique id of the doc
 * @property mt: document metadata
 */
export interface BaseReadEntity {
  /**
   * unique id of the doc
   */
  id: string;
  /**
   * @see EntityMetadata
   */
  mt: EntityMetadata;
}
/**
 * custom document metadata
 * @property createdAt: the creation timestampz of the doc
 * @property updatedAt: the last updated timestampz of the doc
 * @property createdByUid: uid of user who created the doc
 * @property updatedByUid: uid of user who last updated the doc
 */
interface EntityMetadata {
  createdAt: Date;
  updatedAt: Date;
  createdByUid: string;
  updatedByUid: string;
}

export interface BaseWriteEntity {
  /**
   * @see EntityMetadata
   */
  mt: EntityMetadata;
}
