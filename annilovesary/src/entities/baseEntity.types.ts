import type { Timestamp } from "firebase/firestore";

/**
 * Interface for the base data model for any Firestore collections.
 *
 * @property id: the unique identifier of a document once retrieved
 * @property createdAt: the creation server timestamp of the doc
 * @property updatedAt: the last updated server timestamp of the doc
 */
export interface BaseEntity {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
